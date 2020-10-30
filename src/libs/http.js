class Http {
  static instance = new Http();

  get = async (url) => {
    try {
      let req = await fetch(url);
      let json = await req.json();
      return json;
    } catch (err) {
      console.log('http get method err', err);
      throw Error(err);
    }
  };

  post = async (url, body) => {
    try {
      let req = await fetch(url, {
        method: 'POST',
        body,
      });
      let json = await req.json();
      return json;
    } catch (err) {
      console.log('http method post method err', err);
      throw Error(err);
    }
  };

  put = async (url, id, body) => {
    try {
      let req = await fetch(`${url}/${id}`, {
        method: 'PUT',
        body,
      });
      let json = await req.json();
      return json;
    } catch (err) {
      console.log('http put method err', err);
      throw Error(err);
    }
  };

  delete = async (url, id, body) => {
    try {
      let req = await fetch(`${url}/${id}`, {
        method: 'DELETE'
      });
      let json = await req.json();
      return json;
    } catch (err) {
      console.log('http put delete method err', err);
      throw Error(err);
    }
  };
}

export default Http;
