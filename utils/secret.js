const CryptoJS = require('crypto-js') // 引用AES源码js
const key = CryptoJS.enc.Utf8.parse('1234125432ABDDFF') // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234121134') // 十六位十六进制数作为密钥偏移量

// // 加密方法
// export function Encrypt(word) {
// 	const srcs = CryptoJS.enc.Utf8.parse(word)
// 	const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
// 	return encrypted.ciphertext.toString().toUpperCase()
// }
// // 解密方法
// export function Decrypt(word) {
// 	const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
// 	const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
// 	const decrypt = CryptoJS.AES.decrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
// 	const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
// 	return decryptedStr.toString()
// }
// 加密方法
export function Encrypt(word) {
	const srcs = CryptoJS.enc.Utf8.parse(word)
	const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding })
	return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}
// 解密方法
export function Decrypt(word) {
	const encryptedHexStr = CryptoJS.enc.Base64.parse(word)
	const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
	const decrypt = CryptoJS.AES.decrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding })
	const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
	return decryptedStr.toString()
}
