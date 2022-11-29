import React, {useState} from "react";
import {Divider, List, ListItem, ListItemText} from "@mui/material";

const questArray = [
  {
    question: 'Какой цвет в флаге РФ идет первым?',
    answer: ['Красный', 'Синий', 'Белый', 'Зеленый'],
    rightAnswer: 3,
  },
  {
    question: 'Какой цвет в флаге Белорусии идет первым?',
    answer: ['Красный', 'Синий', 'Белый', 'Зеленый'],
    rightAnswer: 1,
  },
  {
    question: 'Какой цвет в флаге Франции идет первым?',
    answer: ['Красный', 'Синий', 'Белый'],
    rightAnswer: 2,
  }
];

export default function Quiz(){
  const [rightAnswerCount, setRightAnswerCount] = useState(0);
  const [numberQuestion, setNumberQuestion] = useState(0);

  const handleSubmit = (answer: number)=> {
    if(answer === questArray[numberQuestion].rightAnswer) {
      setRightAnswerCount(prev => ++prev)
    }
    setNumberQuestion(prev => ++prev);
  }


  return(
      <>
        {numberQuestion < questArray.length ?(
            <List component="nav" aria-label="mailbox folders">
              <Divider />
                  {questArray[numberQuestion].question}
                  {
                    questArray[numberQuestion].answer.map((answer, index) =>(
                          // @ts-ignore
                          <ListItem button divider value={answer} onClick={()=> handleSubmit(index + 1)}>
                            <ListItemText primary={answer} />
                          </ListItem>
                    ))
                  }
              <Divider light />
            </List>
            ) : <p>количество правильных ответов: {rightAnswerCount}</p>
        }
      </>
  )
  // return(
  //     <>
  //       {numberQuestion < questArray.length ?(
  //           <div>
  //             {questArray[numberQuestion].question}
  //             {
  //               questArray[numberQuestion].answer.map((answer, index) =>(
  //                   <div>
  //                     <button value={answer} onClick={()=> handleSubmit(index + 1)}>{answer}</button>
  //                   </div>
  //               ))
  //             }
  //           </div>
  //       ) : <p>количество правильных ответов: {rightAnswerCount}</p>
  //       }
  //     </>
  // )
}