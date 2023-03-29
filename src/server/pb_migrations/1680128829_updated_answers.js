migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("re9nimpwekustlu")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7t88k9lt",
    "name": "question",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "gj1ta1b4b3sc5pl",
      "cascadeDelete": true,
      "maxSelect": 1,
      "displayFields": [
        "title"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("re9nimpwekustlu")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7t88k9lt",
    "name": "field",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "gj1ta1b4b3sc5pl",
      "cascadeDelete": true,
      "maxSelect": 1,
      "displayFields": [
        "title"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
