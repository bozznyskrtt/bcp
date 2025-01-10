const pool = require('./../sql_conn/sqlconn');
const express = require('express');
const app = express();

app.use(express.json());





exports.validate = async (req,res,next)=>{
    const query = 'SELECT * FROM menu WHERE menuName = ?';
    const values =  [req.body.MenuName]; 
    
    const [rows] = await pool.promise().execute(query, values);
    if(rows.length>0){
        return res.status(404).json({ status: 'fail',message: 'Data already added' });
    }
    else{
        next();
    }
};

exports.insertData = async (req,res) => {
    const query = 'INSERT INTO menu (MenuName,category,Price,Image,detail,Isavailable,Amount,options) VALUES (?,?,?,?,?,?,?,?)';
   const values = [
      req.body.MenuName,
      req.body.category,
      req.body.Price,
      req.body.Image,
      req.body.detail,
      req.body.Isavailable,
      req.body.Amount,
      req.body.options
  ];
  
    try{
        const [rows] = await pool.promise().execute(query,values);
        if (rows.affectedRows > 0) {
            res.status(200).json({status: 'success',message: 'Data added successfully' });
            console.log(rows);
          } else {
            res.status(404).json({ status: 'fail',message: 'Fail to add data' });
          }
    }catch(error){
        res.status(500).json({status: 'fail', message: 'server fail' });  console.error('Error adding data: '+error)
        console.error('Error reading data:', error);
    }
  };


  exports.readData = async (req,res) => {
    const query = 'SELECT  MenuName,category,Price,Image,detail,Isavailable,Amount,options FROM menu WHERE category = ?';
    const values = [req.body.category];
  
    try {
        const [rows] = await pool.promise().execute(query, values);
        
        if (rows.length > 0) {
          res.status(200).json({ status: 'success',message: 'Data retrieved successfully', data: rows });
          console.log(rows);
        } else {
          res.status(404).json({status: 'fail', message: 'No data found with the provided ID' });
        }
      } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({status: 'fail', message: 'Failed to read data', error: error.message });
      }
    };



  //id required
  exports.updateData = async (req,res) => {

    const bodyreq = req.body;
    const id = req.params.id;
    const fields = Object.keys(bodyreq).map((bodyreq)=>`${bodyreq} = ?`).join(',')
    const values = [...Object.values(bodyreq),id];
    const query =`UPDATE menu SET ${fields} WHERE  itemid =? `;
    try{
        const [rows] = await pool.promise().execute(query,values);
        if (rows.affectedRows > 0) {
            res.status(200).json({status: 'success', message: 'Data updated successfully' });
            console.error('success');
          } else {
            res.status(404).json({status: 'fail', message: 'No record found with the given ID' });
          }
    }catch(error){
        res.status(500).json({status: 'fail', message: 'server fail' });  console.error('Error updating data: '+error)
        console.error('Error reading data:', error);
    }
  };


//id required
  exports.deleteData = async (req,res) => {
    const query ='DELETE FROM menu WHERE  itemid = ? '
    const id = [req.params.id*1];
    try{
        const [rows] = await pool.promise().execute(query,id);
        if (rows.affectedRows > 0) {
            res.status(200).json({ status: 'success',message: 'Data deleted successfully' });
            console.error('success');
          } else {
            res.status(404).json({ status: 'fail',message: 'No record found with the given ID' });
          }
    }catch(error){
        res.status(500).json({ status: 'successfail',message: 'server fail' });  console.error('Error deleting data: '+error)
        console.error('Error reading data:', error);
    }
  };
  

  exports.getData = async (req,res) => {
    const query = 'SELECT  MenuName,category,Price,Image,detail,Isavailable,Amount,options FROM menu WHERE itemid = ?';
    const id = [req.params.id*1];
  
    try {
        const [rows] = await pool.promise().execute(query, id);
        
        if (rows.length > 0) {
          res.status(200).json({ status: 'success',message: 'Data retrieved successfully', data: rows });
          console.log(rows);
        } else {
          res.status(404).json({status: 'fail', message: 'No data found with the provided ID' });
        }
      } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({status: 'fail', message: 'Failed to read data', error: error.message });
      }
    };



  