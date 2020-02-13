const {addContact, addRelation} = require("../../server/services/contactService");
const {getMyTags} = require("../../server/services/tagService");

(async () => {
  // await addContact({name: "3333", phone: "121313315", tags: ["temp~测试", 'temp~开发']}, {id: 3});
  // const result= await getContacts({keywords:'y'} , {id:1});
  // console.log(result)
  // const tags = await getMyTags({statics:true}, {id: 3});
  // console.log(tags);
  const result = await addRelation({
    relation: "temp~家人3",
    contact: 1,
    contactId: "1"
  }, {id: 1});
  console.log(result);
})();
