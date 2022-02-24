export default function ({ store, redirect, route }) {
  if(route.meta[0].requiresAdmin){ //必須驗證是Admin
    const isStaff = localStorage.getItem('isStaff')
    if (isStaff=='false') { // 不是Admin就登出
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')            
      localStorage.removeItem('id')
      localStorage.removeItem('uid')
      localStorage.removeItem('username')
      localStorage.removeItem('isNpo')
      localStorage.removeItem('isStaff')
      localStorage.removeItem('npoId')    
      return redirect('/backend/Login')
    }
  }
  // if(route.meta[0].requiresAdmin){ //必須驗證是Admin
  //   console.log('AAA:'+route.meta[0].requiresAdmin)
  //   if(process.client) {
  //     console.log('sss')
  //     let isStaff = localStorage.getItem("isStaff")
  //     if (isStaff=='false') { // 不是Admin就登出
  //       localStorage.removeItem('accessToken')
  //       localStorage.removeItem('refreshToken')            
  //       localStorage.removeItem('id')
  //       localStorage.removeItem('uid')
  //       localStorage.removeItem('username')
  //       localStorage.removeItem('isNpo')
  //       localStorage.removeItem('isStaff')
  //       localStorage.removeItem('npoId')    
  //       return redirect('/backend/Login')
  //     }
  //   }
  // }

}