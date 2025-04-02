import JSEncrypt from "jsencrypt";
import {Base64} from "js-base64";
import {el} from "vuetify/locale";

let publicKey = "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JR2ZNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0R05BRENCaVFLQmdRREh6dXR4VlZPZmtnb2R6VFJYYm9VdiswZFgKT3VtdVpHUzJUaldlYUpBbk04dXNYN2g4bTlsNlBjRGx0dmdqdlBNODJxVzlkWVdCMnU3c09CclFvNUFLTVA5bQo1V25ud2lldHl1RjZoZnhMMDhHdkkyWVQ3cER4dHJiQTE3WWVLMmNYSm1tOXFkZENxcFhMdUE1aDU4aXFlNWpSCnoxbENUMGtnZnFJYzBRdC8xUUlEQVFBQgotLS0tLUVORCBSU0EgUFVCTElDIEtFWS0tLS0tCg=="
let privateKey = "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlDWEFJQkFBS0JnUURIenV0eFZWT2ZrZ29kelRSWGJvVXYrMGRYT3VtdVpHUzJUaldlYUpBbk04dXNYN2g4Cm05bDZQY0RsdHZnanZQTTgycVc5ZFlXQjJ1N3NPQnJRbzVBS01QOW01V25ud2lldHl1RjZoZnhMMDhHdkkyWVQKN3BEeHRyYkExN1llSzJjWEptbTlxZGRDcXBYTHVBNWg1OGlxZTVqUnoxbENUMGtnZnFJYzBRdC8xUUlEQVFBQgpBb0dBWVNNcWVWV25LdHQveVk4NmxBcnArektwTXpJejZ4RnBtT3VheTZFLys1OEZ0STV3alR2alZiZHg4UHVyCjFRd0dJSjZYbHV6c2MvM3d5NnhXOVBtZmkwaHl6L1lFVWtOV21rUDF3YTFqOVZXaFgwbzI2RExHenFNeld5OXoKblVoY042VmdjS2dXQTJiU0krSUQyQTRINE1XNytYN201cEYzMkRtU1J0MGFZRUVDUVFEVGhXclk5YTRrNjMyQQptMXVKbG9YamhmaC84c045SjM5djlrMlM1d3loRThCcDFRMWNHY0JZT2dKa2pNOEhaaUlTcm8wVlloMk5BVG5aCjVjMEMxa3JSQWtFQThkTDUwUG8yZTdzTC9mRXg3bGp4bEVyUHlITVlEbjZDdFNyY2hQNUdsRFJYRWNBRlNOdVMKWG1ZRWFlS3k5ZnUyT0V4R3ZvS05xdXVLenl3Q2F4WmR4UUpCQUp3Y2Z2UnJ0c0JXOFlTbXBOT1NQWFRrSHJqSQpBbEh2Z2RXdmNpZDIwVkpjMG9rSmpsZW9SZGFYMGNaR1NsSUtwaUVscE1qZ1pqRDRjNnNIT056Y0xkRUNRSDlGCmhtMVNBdkxEMHQvbjNWdVFQRFRMMnVlb2kzUzFhSjFvM1g2eFJQd2pQOS83cTh4WW80UkROUGQxZExLNXM0R1YKdzNYb3lCNjRzT213UStXUWMvRUNRSFo2U0xjcEZXdzNjK21CWk9pbUNwYWZIVnZqa2t3NE9XZWVaenBvMXpNaQp1UlVEM0NRY1RpSXhaVjVJZmRjdE56M1d6TVF2ZUhzSDBSRzdjWm5ONkdZPQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo="

// 加密
export function encrypt(pk: string, publicKey: string) {
    // 创建对象
    let jsEncrypt = new JSEncrypt();
    // 设置公钥
    jsEncrypt.setPublicKey(Base64.decode(publicKey));
    let encrypted = jsEncrypt.encrypt(pk)
    if (encrypted) {
        return encrypted
    } else {
        return ""
    }
}

// 解密
export function decrypt(pk: string, privateKey: string) {
    // 创建对象
    let jsEncrypt = new JSEncrypt();
    // 设置私钥
    jsEncrypt.setPrivateKey(Base64.decode(privateKey));
    return jsEncrypt.decrypt(pk);
}

// //生成签名
// export function sign() {
//     let privateKey = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSGDWhEuN3Ap6tV1RNoiW/1xNWqF+TYZsz93Y9qJ6jvQNwRkvHBMMev2XqKNzn9WBwQ6o6rDpDoyZlJXYTPLXgGPr/QIL24QPuk4XoSeBaGoKHCiRu0Z9UwsNSOZoTp8lWLx0ijVGXXd6KvtIT442SSxJ0xNOpnDYfORQJqGJY9gu81H2k8iQoxamVtu1n3tpz/P7GDloegOXEUrhsHNycBb9OnGZVkI6exf1+ET3SHCMawuk+vkmYo44BN5xch9IAV9jNoEpeoONPsYop34h6tJfmYPWNs08MP5GY1XbbdUkEMln2vb6EhlG8B5sXZuuXARDTki2FVY+/PwgEcEHdAgMBAAECggEBAMlwZvNCvhAc1fGT2wP4pUM0P5mGJOWV347LBXcHFtwd3Y8oB34SBdeUYm5KscxCDC534l8RRWgWpTiz22uEeUoeCYL14tw9UVzN28WmF9OsuVwrEFWk7aUCfO54xk90P+o/kCrR3tpIKZlUbu6c7t/G1TJaiiuE2KvFOX4tEecCfBa8J72rGK9qCWJPKgVkVO65fcM1NwR3PetFrGg0zYx+wWIwx/d5zyiBe/PETaRs5FiaCQVGc2Fz2OYiEEIm8nyulBnH3TApEnHLk4PzvJZltMcHaAkNKhwyFR5GMXfNpcJYRvr3SFJFbYGXjPRGJ1PuYw8K+d/tjlrlXKkuJyECgYEA/hxWVDieDK09N3BsqHUmJlENqW2ckjdbGhByVY5GZXsI8avDGJNN1/RGkHppTWHns4MQbvUQxY9wfVcqJgsbeL597d/tvSdUISU+H52GF8/IN6wBIyA4iuyU3ghVr6gWpffHxqqMoRbwUTE0JyAHjdag1rvlo32BO4KYbD+ANXUCgYEA06gYDnQq5t1zDdAj/hDbDfkE/0IhjdlosJRoAQApHs139ja2C+J+yWF+F328yMyPnBAM+tOLk47y9GYRwS593D4zXSzWQ8TtrzKaV6JpzrAKBJFDuBMvmoa/SDuLz07ZOvxKiCNKpESlopUxtSS1OmN16LIUZhoh3Wlt/lJvBckCgYB+aOZhO1EUiVG8tIa5Pp3dzdB4CnkrG7KMQsY93WsTrKMEZifFn/HHjlNUKDEeN6gl2vtf1zWisfqJv8TN7BScelb28MC5qkjlvDstSxWb3teBKmXebXbzVUGxOoA1w+6QXbTaFZmjwV+HZGzHUd2wJ6cXa52POS4CxrLAls5WyQKBgQCDhJjmKlMaP5Kli6dB0RF83ja3sk0NSoHd72ms7X+fr0cSjC6UtfnYgqcKS8xJ7apy7BpUpay+VP4s1VvE8XGtsEzUYe8GD1EuI0B6oeYjU4n2CpnMwMc8uuwTI0Ud3T3ohCp/64YPCsTtgM1xZMzj6jezDyzTwPs4DLIXbPul2QKBgHV2tILNj0qKskWuJVhKCdbmE3T7UXCmve7+V4j0Avq5QpK7fgKOW43dliuuK27ecflQfqOF6dT+f4VGjOZQNd1EAlDd6R8fLAeFdLKQt/ev6+f4GRPPPDe7HgW0vdkcLCXUjCfZ/Tnryk+LuHdwJlaG/uAWlfkKT2ZXRR3B/Kw+";
//     // 实例化jsEncrypt对象
//     let jseObj = new JSEncrypt();
//     // 设置私钥
//     jseObj.setPrivateKey(privateKey);
//     console.log("加签结果：" + jseObj.sign("111", jseObj.sign,"SHA256"));
//     // return jseObj.decrypt(password);
// }


