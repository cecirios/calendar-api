const { response } = require('express');
const Evento = require('../models/Evento');

const getEvents = async (req, res=response) => {

   const eventos = await Evento.find()
                              .populate('user', 'name password');
     res.json ({
     ok: true,
     eventos
    })
 }
 
 const crearEvento = async (req, res=response) => {
    
    const evento = new Evento( req.body );


    try {
      evento.user = req.uid; 
      const eventoGuardado = await evento.save();

      res.json({
         ok: true,
         evento: eventoGuardado
      })
    } catch (error ){
      console.log(error)
      res.status(500).json({
         ok:false,
         msg: 'Hable con el administrador'
      })
    }

   
 }
 
 
 const actualizarEvento = async (req, res=response) => {
    const eventoId = req.params.id;
    const uid = req.uid;
   
    try {
      const evento = await Evento.findById( eventoId );

      if (!evento) {
         res.status(404).json({
            ok:false,
            msg: 'Evento no existe con ese id'
         })
      }

      if ( evento.user.toString() !== uid ) {
         return res.status(401).json({
            ok:false,
            msg: 'No tiene privilegio de editar este evento'
         })
      }

      const nuevoEvento = {
         ...req.body,
         user: uid
      }

      const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true} );

      res.json({
         ok:true,
         evento: eventoActualizado
      })

    } catch (error) {
      res.estatus(500).json({
         ok:false,
         msg: 'Hable con el admin',
         eventoId
      })

    }

    res.json({
     ok: true,
     eventoId
    })
 }
 
 const eliminarEvento = async (req, res=response) => {
   const eventoId = req.params.id;
   const uid = req.uid;
  
   try {
     const evento = await Evento.findById( eventoId );

     if (!evento) {
        res.status(404).json({
           ok:false,
           msg: 'Evento no existe con ese id'
        })
     }

     if ( evento.user.toString() !== uid ) {
        return res.status(401).json({
           ok:false,
           msg: 'No tiene privilegio de editar este evento'
        })
     }

    const eventoEliminado = await Evento.findByIdAndDelete( eventoId );

     res.json({
        ok:true,
        evento: eventoEliminado
     })

   } catch (error) {
     res.estatus(500).json({
        ok:false,
        msg: 'Hable con el admin',
        eventoId
     })

   }

   res.json({
    ok: true,
    eventoId
   })
 }

 module.exports = {
    getEvents,
    crearEvento,
    actualizarEvento,
    eliminarEvento
 }