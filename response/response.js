let self = module.exports ={
    CREATED: function (res, raw){
        res.setHeader('Content-type', 'application/json');
        res.writeHead(201);
        res.end(JSON.stringify(raw, null, 2))
    },
    OK: function (res, raw){
        res.setHeader('Content-type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(raw, null, 2))
    },
    ERROR: function (res, raw){
        res.setHeader('Content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify(raw, null, 2))
    },
    NOTFOUND: function (res, raw){
        res.setHeader('Content-type', 'application/json');
        res.writeHead(404);
        res.end(JSON.stringify(raw, null, 2))
    },
    
}