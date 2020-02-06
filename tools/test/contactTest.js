const {addContact, getContacts} = require("../../server/services/contactService");
const {getMyTags} = require("../../server/services/tagService");

(async () => {
  // await addContact({name: "3333", phone: "121313315", tags: ["temp~测试", 'temp~开发']}, {id: 3});
  // const result= await getContacts({keywords:'y'} , {id:1});
  // console.log(result)
  const tags = await getMyTags({statics:true}, {id: 3});
  console.log(tags);
})();
