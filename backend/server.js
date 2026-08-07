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
   FŐ OLDALI API LEKÉRÉSEK
========================= */

app.get('/api/temakorok/szuro_tantargyossz', async (req, res) => {
  const rows = await sql`
    select 
      tantargyak.nev as tantargy,
      count(*) as darab
    from temakorok
    join tantargyak on tantargyak.id = temakorok.tantargy_id
    group by tantargyak.id, tantargyak.nev
    order by tantargyak.nev
  `
  res.json(rows)
})

app.get('/api/feladatok/szuro_tanfel', async (req, res) => {
  const rows = await sql`
    select 
      tantargyak.nev as tantargy,
      count(*) as darab
    from feladatok
    join temakorok on temakorok.id = feladatok.temakor_id
    join tantargyak on tantargyak.id = temakorok.tantargy_id
    group by tantargyak.id, tantargyak.nev
    order by tantargyak.nev
  `
  res.json(rows)
})



/* ========================= 
   SZERVER INDÍTÁS - MINDIG A VÉGÉN!
========================= */

app.listen(3000, () => {
  console.log('Server fut: http://localhost:3000')
})