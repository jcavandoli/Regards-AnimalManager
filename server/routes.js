module.exports = function(app) {
  var nStore = require('nstore').extend(require('nstore/query')());
  var animals = nStore.new(require('path').join( __dirname, 'data/animals.db'), function(err) {
    if(err) return console.log('Error while loading db', err);
  });

  // Get all
  app.get('/animals', function(req, res) {
    animals.all(function(err, results) {
      if(err) {
        return res.json({error: err});
      }
      var datas = [];
      for (var key in results) {
        var data = results[key];
        data.id = key;
        datas.push(data);
      }
      return res.json(datas);
    });
  });

  // Get one by id
  app.get('/animals/:id', function(req, res) {
    if(!req.params.id) {
      return res.json({error: 'id param is missing'});
    }
    animals.get(req.params.id, function(err, result) {
      if(err) {
        return res.json(err);
      }
      return res.json(result);
    });
  });

  // Create
  app.post('/animals', function(req, res) {
    if(!req.body) {
      return res.json({error: 'data is missing'});
    }
    animals.save(null, req.body,  function(err) {
      if(err) {
        return res.json(err);
      }
      return res.status(200).end();
    });
  });

  // Update
  app.put('/animals/:id', function(req, res) {
    if(!req.body) {
      return res.json({error: 'data missing'});
    }
    if(!req.params.id) {
      return res.json({error: 'id param is missing'});
    }
    animals.save(req.params.id, req.body, function(err) {
      if(err) {
        return res.json(err);
      }
      return res.status(200).end();
    });
  });

  // Delete
  app.delete('/animals/:id', function(req, res) {
    if(!req.params.id) {
      return req.json({error: 'id param is missing'});
    }
    animals.remove(req.params.id, function(err) {
      if(err) {
        return res.json(err);
      }
      return res.status(200).end();
    });
  }); 
}