
// import "@/../static/js/config";//导入项目配置文件
import CryptoJS from "@/util/aes.js"
//密码加密
export const encryption = {
  data(){
    return {
      secretKey:"BaoWei@ChongQing"
    }
  },
  methods: {
    //加密事件
    getAesString(data) {
      let key = CryptoJS.enc.Utf8.parse(this.secretKey);
      let iv = CryptoJS.enc.Utf8.parse(this.secretKey);
      let encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString(); //返回的是base64格式的密文
    },
    //解密
    decrypt(data){
      let key = CryptoJS.enc.Utf8.parse(this.secretKey);
      let iv = CryptoJS.enc.Utf8.parse(this.secretKey);
      let decrypt = CryptoJS.AES.decrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return CryptoJS.enc.Utf8.stringify(decrypt).toString()
    }
  }
}
