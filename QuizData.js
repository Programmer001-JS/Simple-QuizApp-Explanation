// Ovde pravimo componentu gde cemo da smestamo nase podatke koje zelimo da koristimo u nasoj app.
// i koja ce biti importovana kroz map(); metodu da bi bila prikazana ( Render ) u nasoj app.
//pravimo array, object ili brojeve.
 const QuizData = [// kad stavimo samo const i ime komponente onda moramo da stavimo export default imeKomponente inace moramo da stavimo u {imeKomponente } tamo gde je uvozimo.
    {
        id:0,// broj - Ovo je id koji moramo imati i prvi Object stavljamo da bude id:0;
        question:"Koji je glavni grad Rusije",//object
        options:["Moskva","Kazan","Samara","Krasnodar"],//array
        answer:"Moskva"//object
    },
    //ovo je sve jedan Object a imamo ukupno 4 ali posto krece od 0 imamo index vrednost zadnjeg object-a 3.
    {
        id:1,
        question:"Koji je glavni grad Srbije",
        options:["Nis","Sombor","Beograd","Leskovac"],
        answer:"Beograd"
    },
    {
        id:2,
        question:"Koji je najbolji fudbaler na svetu",
        options:["Messi","Ronaldo","Maradona","Milivoje Cirkovic"],
        answer:"Milivoje Cirkovic"
    },
    {
        id:3,
        question:"Koji je najbolji auto na svetu",
        options:["Audi","Bmw","Mercedes","Range Rover"],
        answer:"Mercedes"
    }
]
export default QuizData

