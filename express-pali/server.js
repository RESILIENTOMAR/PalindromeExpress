const express = require("express")
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient
const app = express()

MongoClient.connect('mongodb+srv://teixeiraomar1:XmEB0kkCYTl5XVa8@cluster0mar.d1vzcej.mongodb.net/isPalindrome?retryWrites=true&w=majority', {

    useUnifiedTopology: true
})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('isPalindrome')
        const isPalindrome = db.collection('attempts')
        app.set('view engine', 'ejs')

        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(express.static('public'))
        app.use(bodyParser.json())

        app.get('/api', (req, res) => {

            if (req.query.input) {
                let string = req.query.input.trim()
                let reverseStr = string.replace(' ', '').toLowerCase()
                let newStr = reverseStr.split('').reverse().join('')
                let isTrue = null

                if (reverseStr === newStr) {
                    isTrue = true


                }
                else {
                    false
                }

                const objToJson = {
                    isPali: isTrue,
                    originalWord: 'newStr',
                    reverseWord: 'reverseStr'

                }
                res.send(objToJson);
            }
        })

        app.get('/', (req, res) => {
            db.collection('attempts')
                .find().toArray().then(results => {
                    res.render('index.ejs', { attempts: results })
                })
                .catch(error => console.error(error))
        })

        app.get('/palindrome', (req, res) => {
            db.collection('attempts')
                .find()
                .toArray()
                .then(results => {
                    res.render('palindrome.ejs', { attempts: results })
                })
                .catch(error => console.error(error))
        })

        app.post('/palindrome', (req, res) => {
            db.collection('attempts')
                .insertOne(req.body)
                .then(result => {
                    res.redirect('/palindrome')

                })
                .catch(error => console.error(error))
        })

        app.delete('/palindrome', (req, res) => {
            db.collection('attempts').findOneAndDelete({ palindrome: req.body.results }, (err, result) => {
                console.log(req.body)
                if (err) return res.send(500, err)
                res.send('Deleted!')
            })
        })

        app.listen(1992, () => console.log("App Is Running on Port 1992"))

    })