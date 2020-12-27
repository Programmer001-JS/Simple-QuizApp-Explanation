import React, { Component } from 'react'
import { QuizData } from './QuizData';// importujemo QuizData komponunetu u {} zagradama,sto znaci da izvlacimo podatke iz te komponente.
// i kad stavimo u komponenti QuizData, export default QuizData onda ovde ne moramo da stavljamo { viticaste zagrade}

//QuizData.length ----  length je atribut nase komponente QuizData koji oznacava duzinu [arrey-a] tj duzinu nase komponente tj koliko ona ima objekata u sebi ,
//koja je jako bitna stavka u nasoj app 
//posto pomocu nje racunamo nas index ili id i prelazimo na sledece pitanje i korisna je za mnogo drugih stvari i aplikacija.
//QuizData.length je 4 u nasem slucaju posto u arrey-u imamo 4 objecta.
//U nasoj componenti koja je zaduzena za podatke kao u ovoj QuizData,prvo pitanje stavljamo sa id:0,i tako ce nasa QuizData.length biti uvek za 1 veca  od id zadnjeg pitanja u ovom slucaju.

class Test extends Component {
    constructor(props) {// pocetna vrednost props-a
        super(props);// nasledjuje iz parent komponente.

        // u stejt stavljamo sve sto nam je potrebno za kviz, svi objekti, i ovo nije lak zadatak.
        this.state = {
            userAnswer: null,// null predstavlja namerno odsutvo bilo koje vrednosti objekata,
            // a stavljamo da bude null nedefinisana zato sto ne znamo da li ce odgovor usera biti false ili true.

            currentIndex: 0,//stavljamo pocetnu vrednost 0 da sve krene od nule,
            // posto smo tamo u QuizData stavili prvo pitanje da bude index 0,i da nam ovde prvo pitanje bude sa index -0,
            //kada imamo neku stranicu koju cemo menjati posle klika, mozemo da radimo na ovaj nacin.
            //tako sto cemo staviti da pocetna vrednost bude 0 ,tj id:0,prvi objekat da bude id:0.
            //a svaki sledeci veci za 1.

            options: [],// opstions stavljamo u array,zato sto nam stoji vec u array.

            quizEnd: false,//mora da stoji false kao pocetna vrednost da bi na kraju presla u true,clickom na dugme finish.

            score: 0,// rezultat

            disabled: true,//da dugme bude disabled
        }
    }
    //  pravimo ovu funkciju koja ce automatski da se ucita kad i nasa komponenta.
    // i da zna kako da rasporedi pitanja koja strana pitanja da ide prva ali sa ovim ne prikazujemo pitanja,vec sa nasom map() metodom.
    //ova funkcija ne moze biti pozvna sama od sebe vec je pozivamo kao zivotni ciklus komponente kroz componentDidMount,
    loadQuiz = () => {
        const { currentIndex } = this.state;

        this.setState(() => { // arrow fucntion stavljamo zato sto nas setState mora da pokrene neki dogadjaj i da prikaze nesto.

            return {// da question bude question iz QuizData componente sa [currentIndex-om] koji je 0 sto znaci pokazi pitanje koje ima index ili id:0 , tj prvo pitanje
                // prvo stavljamo iz kog dela objecta hocemo da uzmemo nesto u ovom slucaju iz QuizData(komponente) uzmi [currentIndex] za question.
                question: QuizData[currentIndex].question,// da prvo pitanje bude prikazano sa id 0.kao sto je podeseno u nasem stejtu currentIndex:0,
                options: QuizData[currentIndex].options,// da prikaze prve opcije odgovora sa id 0.
                answer: QuizData[currentIndex].answer//da prikaze prvi tacan odgovor sa id 0.
            }
        })
    }

    // kada pravimo funckiju u kojoj imamo if() statment ,moramo da idemo ovim redom ,a nasa setState({}) metoda ide na kraju da obracuna nas stejt,
    // i prikaze ono sto hocemo da se desi sa nasim stejtom i kako hocemo da on izgleda,nakon klika na dugme.
    nextQeustionHandler = () => {
        const { userAnswer, answer, score } = this.state; //ovo znaci da cemo u nasoj funckiji koristiti ove objekte iz {}.

        if (userAnswer === answer) { // ako je odgovor korisnika === nasem tacnom odgovoru onda nam povecaj score za 1.
            this.setState({
                score: score + 1
            })
        }
        // ako odgovori na pitanje povecaj nam index tj id za + 1 ,tako cemo preci na sledece pitanje.
        //bez obzira da li je pitanje tacno ili ne ovaj deo setState-a nas prebacuje na sledece pitanje.
        this.setState({
            currentIndex: this.state.currentIndex + 1,//povecaj index za 1 sto znaci da bude index = sledecem pitanju ,i tako ce nam prikazati to pitanje.
            userAnswer: null//ovo je i dalje null dok se ne odgovori na zadnje pitanje,posto cemo tek posle zadnjeg pitanja znati koliko imamo tacnih odgovora.
            //prelazimo na sledece pitanje i u sledecemo ce userAnswer biti null, posto isto ne znamo da li ce odgovoriti tacno ili pogresno,true ili false.
        })
    }

    // ucitava nasu stranicu i prikazuje funkciju load(),
    componentDidMount() {
        this.loadQuiz();
    }

    //proverava odgovor, da odgovor korisnika bude tacan odgovor koji smo mi zadali,
    //i da bi na osnovu toga procenio tacan odgovor i davao poene.
    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,//da odgovor korisnika bude nas " tacan odgovor" koji smo zadali.
            disabled: false // posto samo dali neki odgovor disable prelazi u false i omogucava da moze da se klikne dalje na dugme.
        })
    }

    // ovu metodu pozivamo nakon azuriranja komponente ,koja treba da prikaze sve ponovo,znaci da ponovo prikaze pitanja.
    componentDidUpdate(prevProps, prevState) {//ovi argumenti znace da prikaze prethodni stejt, posto ce poslednji poziv setState()
        //zameniti bilo koju prethodnu vrednost,tj prethodi stejti se ne racuna vec se gledamo samo zadnji.
        //argument prevState stavljamo posto moramo da trenutni currentIndex racunamo sa prethodnim stejtom u if() stejtmentu.

        const { currentIndex } = this.state;

        if (this.state.currentIndex != prevState.currentIndex) {//posto smo odgovorili na pitanje currentIndex se povecava za + 1,
            //i da bi mogla da se renderuje nasa App i prikaze sledece pitanje moramo koristiti if() statment,
            //posto je currentIndex povecan za + 1 nije vise = prethodnom currentIndex-u nego je veci za 1,u if() statmentu postavljamo pitanje koje glasi,
            //ako trenutni currentIndex nije jednak prethodnom currentIndex-u postavi sledece pitanje posto je ovo izjava tacna on ce vratiti i prikazati sledece pitanje.
            this.setState(() => {
                return {
                    question: QuizData[currentIndex].question,
                    options: QuizData[currentIndex].options,
                    answer: QuizData[currentIndex].answer
                }
            })
        }
    }
    // kada se klikne na finish dugme i ako je uslov ispunjen quizEnd prelazi u true. 
    finishHandler = () => {
        // ako ovde imao const {currentIndex} = this.state, onda nam ovo ne treba this.state vec samo currentIndex

        if (this.state.currentIndex === QuizData.length - 1) {// uslov mora biti isti kao i u button-u.
            this.setState({
                quizEnd: true
            })
        }
    }


    render() {

        const { question, quizEnd, userAnswer, options, currentIndex } = this.state; // ovo koristimo i uzimamo iz state-a

        if (quizEnd) {// ako postoji quizEnd onda nam pokazi tacne odgovore na kraju kroz ovu map() metodu.
            return (
                <div>
                    <h1>
                        Game is Over.Result is {this.state.score} points!
                    </h1>
                    {
                        QuizData.map((item, index) => (   // ponovo loopujemo nasu komponentu ali sada malo drugacije pristupamo joj direktno,
                            // i iz nje uzimamo sta nam treba ,argumentom (item)-moze da stoji bilo sta.i sada prikazujemo nase odgovore koje smo zadali po answer.
                            <li className="options" key={index}>
                                {item.answer} 
                            </li>// 
                        ))
                    }
                </div>
            )
        }
        return (
            <div>
                <h1>{question}</h1> // prikazi text koji je u QuizData stavljen pod question.
                <h2>{`Question ${currentIndex + 1} of ${QuizData.length}`}</h2> // prikazi za naslov currentIndex i povecaj ga za 1 svakim sledecim pitanjem od ukupne duzine opcija.[] array-a,posto mu je pocetna vrednost 0 znaci prvo pitanje ce biti 1,0 + 1 = 1
                {
                    options.map(option =>  // prikazuje nasa pitanja map() metoda.
                        <p key={option.id} className={`options ${userAnswer === option ? "selected" : null}`} // ako user (userAnswer) klinke na neki od odgovora koji su nasa (options),a ovde option onda ce reagovati class "selected" a sve to u className = "options"
                            // i posto imamo eventHandler onClick kada kliknemo na <p> reagovace to dugme i uraditi svoj deo posla.
                            //i moramo da stavimo arrow function i da stavimo argument(option) posto smo tako nazvali u nasoj map();metodi.
                            onClick={() => this.checkAnswer(option)}>
                            {option}
                        </p>
                    )
                }

                {currentIndex < QuizData.length - 1 && // ovo dugme ce se prikazivati sve dok je currentIndex manji od Quizdata.length(4) -1 koji je (4 - 1) znaci kad currentIndex bude 3 isto kao i zadnje pitanje u QuizData,onda ce prestati. 
                    <button disabled={this.state.disabled} onClick={this.nextQuestionHandler}>
                        Next Question</button>
                }
                {currentIndex === QuizData.length - 1 && // kad currentIndex bude 3 sto je i id naseg zadnjeg pitanja tada ce se pojaviti ovo dugme,kad currentIndex bude = index-u naseg zadnjeg pitanja (4 - 1)
                    //currentIndex se svakim odgovorom na pitanje povecava za +1 i kada dodje do zadnjeg tada ce biti 3 sto je = id naseg zadnjeg pitanja.QuizData(4) 4 - 1 = 3 

                    <button disabled={this.state.disabled} onClick={this.finishHandler}>Finish</button>
                }

            </div>
        )
    }
}
export default Test;