migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gj1ta1b4b3sc5pl")

  // remove
  collection.schema.removeField("p8cerjd7")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gj1ta1b4b3sc5pl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p8cerjd7",
    "name": "answers",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "answerA",
        "answerB",
        "answerC",
        "answerD"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
