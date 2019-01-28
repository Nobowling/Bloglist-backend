const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = 'mongodb://nobowling:AjquCuH5NdtpDZ4@ds145463.mlab.com:45463/notesdatabase'

mongoose.connect(url)

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

const note = new Note({
  content: 'HTML on tosi ez helppoa',
  date: new Date(),
  important: true
})

Note
  .find({})
  .then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })

/*note
  .save()
  .then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })*/