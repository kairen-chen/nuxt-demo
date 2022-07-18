<template lang="pug">
    .container
      .inline
        app-logo(msg="downLoadZip")
  </template>

<script>
import AppLogo from "~/components/AppLogo.vue";
import Promise from "bluebird";
import JsZip from "jszip";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  components: {
    AppLogo,
  },
  data() {
    return {
      SAVE_FILE_TEMP: [],
    };
  },
  mounted() {
    /*
        提供三種情境
        1. 任何檔案都壓縮在一包
        2. json匯出成多隻excel壓縮在一包
        3. json匯出成1隻excel多個sheet
    */
    // this.handleBatchDownload([
    //   "http://10.57.57.152/5180上架申請表修改版(含微樂志工推廣)_final(20200317).doc",
    //   "http://10.57.57.152/5180上架流程與資格說明_20210601.pdf",
    // ]);
    // this.exportMultipleExcel();
    this.exportOneExcel();
  },
  methods: {
    // ------------任何檔案都壓縮在一包------------
    getFile(url) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url,
          responseType: "arraybuffer", //blob、arraybuffer
        })
          .then((data) => {
            resolve(data.data);
          })
          .catch((error) => {
            reject(error.toString());
          });
      });
    },
    handleBatchDownload(data) {
      const zip = new JsZip();
      const promises = [];
      data.forEach((item) => {
        const promise = this.getFile(item).then((data) => {
          // 下載檔案, 並存成ArrayBuffer物件
          const arr_name = item.split("/");
          const file_name = arr_name[arr_name.length - 1]; // 獲取檔名
          zip.file(file_name, data, { binary: true }); // 逐個新增檔案
        });
        promises.push(promise);
      });
      Promise.all(promises).then(() => {
        zip
          .generateAsync({
            type: "blob",
            compression: "DEFLATE", // STORE：默認不壓縮 DEFLATE：需要壓縮
            compressionOptions: {
              level: 9, // 壓縮等级1~9    1壓縮速度最快，9最佳壓縮方式
            },
          })
          .then((content) => {
            console.log(content);
            FileSaver.saveAs(content, "compression.zip"); // 利用file-saver儲存檔案
          });
      });
    },
    // ------------json匯出成多隻excel壓縮在一包------------
    async exportMultipleExcel() {
      for (let i = 0; i < 2; i++) {
        await this.$store.dispatch("CONTENTS_READ");
        // 內容
        var animalWS = XLSX.utils.json_to_sheet(this.$store.state.contents);
        // 建立excel
        var wb = XLSX.utils.book_new(); // make Workbook of Excel
        // 於excel建立一個sheet(tag)
        XLSX.utils.book_append_sheet(wb, animalWS, "Objects"); // sheetAName is name of Worksheet
        this.makeBlob(wb, i);
      }
      // 匯出
      this.exportFile();
    },
    // 製作excel暫存檔
    makeBlob(wb, excelFileTitle) {
      // 不跑這個會造成檔案損毀
      let changeData = (s) => {
        //如果存在ArrayBuffer物件(es6) 最好採用該物件
        if (typeof ArrayBuffer !== "undefined") {
          //1、建立一個位元組長度為s.length的記憶體區域
          let buf = new ArrayBuffer(s.length);
          //2、建立一個指向buf的Unit8檢視，開始於位元組0，直到緩衝區的末尾
          var view = new Uint8Array(buf);
          //3、返回指定位置的字元的Unicode編碼
          for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
          return buf;
        } else {
          let buf = new Array(s.length);
          for (let i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
          return buf;
        }
      };

      this.SAVE_FILE_TEMP.push({
        fileName: excelFileTitle,
        blob: new Blob([
          changeData(
            XLSX.write(wb, {
              bookType: "xlsx",
              bookSST: true,
              type: "binary",
            })
          ),
        ]),
      });
    },
    // 製作壓縮檔並供儲存
    exportFile() {
      const zip = JsZip();
      this.SAVE_FILE_TEMP.forEach((item, index) => {
        zip.file(`_${index}.xlsx`, item.blob);
      });
      zip.generateAsync({ type: "blob" }).then((zipFile) => {
        FileSaver.saveAs(zipFile, "_統計分析.zip");
        this.SAVE_FILE_TEMP = [];
      });
    },
    // ------------json匯出成1隻excel多個sheet------------
    async exportOneExcel() {
      for (let i = 0; i < 2; i++) {
        await this.$store.dispatch("CONTENTS_READ");
        this.SAVE_FILE_TEMP.push({
          fileName: `_${i}`,
          animalWS: XLSX.utils.json_to_sheet(this.$store.state.contents),
        });
      }
      this.exportOneFile();
    },
    exportOneFile() {
      let wb = XLSX.utils.book_new();
      this.SAVE_FILE_TEMP.forEach((item) => {
        XLSX.utils.book_append_sheet(wb, item.animalWS, item.fileName);
      });
      XLSX.writeFile(wb, `統計分析.xlsx`);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  flex-direction: column;
  #getID {
    color: red;
  }
  .inline {
    display: inline-flex;
  }
}
</style>
