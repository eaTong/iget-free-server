const {addContact, getContactDetail, getContacts, importContacts} = require("../../server/services/contactService");
const {getMyTags} = require("../../server/services/tagService");

const contacts = [
  {name: "Hank M. Zakroff", phone: "5557664823", contactUniqueKey: "device:29CE46A0-98CF-419B-B5B8-475FC80FF486,key:5"},
  {name: "Kate Bell", phone: "5555648583", contactUniqueKey: "device:29CE46A0-98CF-419B-B5B8-475FC80FF486,key:1"},
  {name: "David Taylor", phone: "5556106679", contactUniqueKey: "device:29CE46A0-98CF-419B-B5B8-475FC80FF486,key:6"},
  {
    name: "Daniel Higgins Jr.",
    phone: "5554787672",
    contactUniqueKey: "device:29CE46A0-98CF-419B-B5B8-475FC80FF486,key:2"
  },
  {name: "Zhou EaTong", phone: "18288756143", contactUniqueKey: "device:29CE46A0-98CF-419B-B5B8-475FC80FF486,key:7"},
  {name: "John Appleseed", phone: "8885555512", contactUniqueKey: "device:29CE46A0-98CF-419B-B5B8-475FC80FF486,key:3"},
  {name: "Anna Haro", phone: "5555228243", contactUniqueKey: "device:29CE46A0-98CF-419B-B5B8-475FC80FF486,key:4"}
];

(async () => {
  // await addContact({name: "3333", phone: "121313315", tags: ["temp~测试", 'temp~开发']}, {id: 3});
  // const result = await importContacts(contacts, {id: 1});
  const result = await getContacts({tagIds: ["7", "8"]}, {id: 1});
  // console.log(result)
  // const tags = await getMyTags({statics:true}, {id: 3});
  // console.log(tags);
  // const result = await addRelation({
  //   relation: "temp~介绍人",
  //   contactFromId: 1,
  //   contactToId: "1"
  // }, {id: 1});
  console.log(result);
})();
