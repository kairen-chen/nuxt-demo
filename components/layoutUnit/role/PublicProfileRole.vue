<template>
  <Modal
    class="modal"
    v-model="showModal"
    :ok-text="'同意'"
    :cancel-text="'取消'"
    width="70%"
    title="志工個資同意條款"
    @on-ok="$emit('publicProfile', true)"
  >
    <span style="line-height: 150%">
      <b
        >本人參加台灣大哥大基金會(以下稱本基金會)微樂志工平台(以下稱本平台)志工服務，同意以下條款:</b
      >
      <br />
      <br />
      1. 本人同意於本平台上所填寫及上傳之個人資料(包括姓名、電話、
      email、照片及個人證照等)，本基金會均可蒐集、處理及利用，若選擇個人資料公開者，並同意本基金會得於本平台上公開本人個人資料，以提供相關社福團體或其他本基金會合作單位(以下合稱社福團體)閱覽或下載，社福團體並可依據上述資料與本人聯繫，以進行志工招募及相關活動使用。
      <br />
      <br />
      2.
      本人應提供完整詳實且符合真實之個人資料，如填寫或上傳之資料嗣後有變更時，應隨時於本平台更新。本人所提供之個人資料如有填寫不實、原所填寫之資料已不符合真實而未更新、所提供之個人資料違反或破壞本基金會服務宗旨或有任何誤導之嫌者，本基金會有權拒絕或隨時終止其使用本平台或是網站服務之一部或全部。
      <br />
      <br />
      3.
      本人了解並同意，本基金會僅係提供志工媒合之平台服務，且不保證一定會有社福團體與本人進行聯繫或招募、錄用。本人了解選擇個人資料公開者，個人資料將公開於本平台上供社福團體閱覽及下載，提供資料均屬個人意願，如因本人與社福團體之聯繫、招募、活動配合、費用或個人資料運用等發生任何爭議或糾紛，將由本人與社福團體自行處理，概與本基金會及本平台無涉。若有發現個人資料疑遭外洩，得向本平台反映或檢舉。
      <br />
      <br />
      4.
      本人了解並同意，本基金會對於本人個人資料之蒐集、處理及利用，除本同意條款外，並將依據微樂志工網站隱私權政策辦理，且本人同意仍需遵守微樂志工網站隱私權政策及會員服務條款之規定。
      <br />
      <br />
      5.
      本基金會得隨時修正本條款，並隨時透過本平台/網站公佈之，修正條款自公佈時起生效。
      <br />
      <br />
      <b>本條款所定之任何條款，其全部或一部無效時，不影響其他條款之效力。</b>
    </span>
  </Modal>
</template>
<script>
export default {
  props: ["modalShow"],
  data() {
    return {
      showModal: false,
    };
  },
  watch: {
    modalShow(val) {
      this.showModal = val;
    },
    showModal(val) {
      this.$emit("modalHandler", val);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/member/common.scss";
@import "@/assets/scss/components/modal/common.scss";
</style>
