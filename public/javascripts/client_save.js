function openDatabase() {
  return new Promise((resolve, reject) => {
    const dbName = "myDatabase";
    const request = indexedDB.open(dbName, 1);

    request.onerror = function (event) {
      reject(event.target.error);
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      // Membuat object store (tabel) dengan nama 'myStore'
      const store = db.createObjectStore("myStore", { keyPath: "id" });
      // Menambahkan indeks untuk pencarian
      store.createIndex("txt", "txt", { unique: false });
      store.createIndex("ref", "ref", { unique: false });
      store.createIndex("setuju", "setuju", { unique: false });
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      resolve(db);
    };
  });
}

export function saveData(dt, id, tipe) {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction(["myStore"], "readwrite");
        const store = transaction.objectStore("myStore");

        const data = { id: id, [tipe]: dt };
        const request = store.put(data);
        request.onsuccess = function (event) {
          resolve(`Data bertipe ${tipe} dan id ${id} berhasil disimpan`);
        };
        request.onerror = function (event) {
          reject(event.target.error);
        };
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function deleteData(id) {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction(["myStore"], "readwrite");
        const store = transaction.objectStore("myStore");

        const request = store.delete(id);
        request.onsuccess = function (event) {
          resolve(`DATA DENGAN ID ${id} BERHASIL DIHAPUS`);
        };
        request.onerror = function (event) {
          reject(event.target.error);
        };
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function displayData(id) {
  try {
    const db = await openDatabase();
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(["myStore"], "readonly");
      const store = transaction.objectStore("myStore");

      const getRequest = store.get(id);
      getRequest.onsuccess = function (event) {
        const data = event.target.result;
        if (data) {
          resolve(data); // mengembalikan nilai data
        } else {
          resolve(null); // data tidak ditemukan atau kosong
        }
      };
      getRequest.onerror = function (event_1) {
        reject("Error retrieving data: " + event_1.target.error);
      };
    });
  } catch (error) {
    return await Promise.reject("Error opening database: " + error);
  }
}