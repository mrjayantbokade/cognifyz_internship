import express from 'express'

const app = express()

const students = [
    {
        id: 1,
        name: 'Jayant'
    },
    {
        id: 2,
        name: 'Robin'
    }
]

app.get('/', (req, res) => {
    res.send( {students})

})
app.listen(3000, () => {
    console.log('Server is running on port 3000')
    console.log('http://localhost:3000')
})