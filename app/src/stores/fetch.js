import Cookies from 'js-cookie'

export function getJson(url) {
  return new Promise((resolve,reject) => { fetch(url, { headers: new Headers({
        authorization: Cookies.get('token')
      })
    }
    ).then(response =>{
      if(response.ok) {
        response.json().then(json => resolve(json))
      } else {
        response.text().then(text => reject(text))
      }
    }).catch(error => {
      reject(error)
    })


  })
}

export function putJson(url, json) {
  return new Promise((resolve, reject) => {
    return fetch(url, {
      method:'PUT',
      headers: new Headers({
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      }),
      body: JSON.stringify(json)
    }).then(response =>{
      if(response.ok)
        response.text().then(text => resolve(text))
      else
        response.text().then(text => reject(text))
    }).catch(err => reject(err))
  })

}

export function postJson(url, json) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method:'POST',
      headers: new Headers({
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      }),
      body: JSON.stringify(json)
    }).then(response =>{
      if(response.ok) {
        response.text().then(text => resolve(text))
      } else {
        response.text().then(text => reject(text))
      }
    }).catch(err => reject(err))
  })
}
