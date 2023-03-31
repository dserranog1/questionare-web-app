migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("re9nimpwekustlu")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rmpo5u4c",
    "name": "correct",
    "type": "bool",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("re9nimpwekustlu")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rmpo5u4c",
    "name": "correct",
    "type": "bool",
    "required": true,
    "unique": true,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
