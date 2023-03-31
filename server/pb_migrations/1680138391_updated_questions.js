migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gj1ta1b4b3sc5pl")

  // remove
  collection.schema.removeField("pirulguo")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gj1ta1b4b3sc5pl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pirulguo",
    "name": "answer",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "re9nimpwekustlu",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": [
        "description"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
