migrate((db) => {
  const collection = new Collection({
    "id": "re9nimpwekustlu",
    "created": "2023-03-29 15:17:49.482Z",
    "updated": "2023-03-29 15:17:49.482Z",
    "name": "answers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "au0npqwo",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "7t88k9lt",
        "name": "field",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "gj1ta1b4b3sc5pl",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": [
            "id"
          ]
        }
      },
      {
        "system": false,
        "id": "rmpo5u4c",
        "name": "correct",
        "type": "bool",
        "required": false,
        "unique": true,
        "options": {}
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("re9nimpwekustlu");

  return dao.deleteCollection(collection);
})
