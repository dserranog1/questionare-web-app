migrate((db) => {
  const collection = new Collection({
    "id": "gj1ta1b4b3sc5pl",
    "created": "2023-03-29 15:14:00.401Z",
    "updated": "2023-03-29 15:14:00.401Z",
    "name": "questions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "60nx89aa",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
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
  const collection = dao.findCollectionByNameOrId("gj1ta1b4b3sc5pl");

  return dao.deleteCollection(collection);
})
