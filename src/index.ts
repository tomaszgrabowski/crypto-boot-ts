import app from "./App";
const port = 3000;
app.listen(port, ()=> {
  console.log('Express server listening on port ' + port);

  app.get('/',(req, res)=>{
    res.json('dupa');
  })
});