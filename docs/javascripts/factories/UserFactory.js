app.factory("UserFactory", function($http, $q, FIREBASE_CONFIG){

	let addUser = (authData) => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`, 
        JSON.stringify({ 
          uid: authData.uid,
          username: authData.username
        })
      )
      .then((storeUserSuccess) => {
        resolve(storeUserSuccess);
      })
      .catch((storeUserError) => {
        reject(storeUserError);
      });
    });
  };

  let editUser = editedUser => {
    let holderObj = JSON.parse(JSON.stringify(editedUser));
    delete editedUser.id;
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/users/${holderObj.id}.json`, angular.toJson(editedUser))
      .then(result => resolve(result))
      .catch(error => reject(error));
    });
  };

  let getUser = (userId) =>{
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
        .then((userObject) => {
          userObject = userObject.data;
          let users = [];
          Object.keys(userObject).forEach(key => {
            userObject[key].id=key;
          });
          Object.keys(userObject).forEach(key => {
            users.push(userObject[key]);
          });
          resolve(users[0]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {addUser:addUser, getUser:getUser, editUser:editUser};

});