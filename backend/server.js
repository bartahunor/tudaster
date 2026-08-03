import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sql from './db.js'


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

/* =========================
   TANTÁRGYAK - lekérés és létrehozás
========================= */

app.get('/api/tantargyak', async (req, res) => {
  const rows = await sql`select * from tantargyak order by nev`
  res.json(rows)
})

app.post('/api/tantargyak', async (req, res) => {
  const { nev } = req.body

  const result = await sql`
    insert into tantargyak (nev)
    values (${nev})
    returning *
  `

  res.json(result[0])
})



/* ========================= 
   SZERVER INDÍTÁS - MINDIG A VÉGÉN!
========================= */

app.listen(3000, () => {
  console.log('Server fut: http://localhost:3000')
})