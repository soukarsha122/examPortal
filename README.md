# XML-based Quiz Application

This project is an interactive quiz application built using HTML, JavaScript, and AJAX. It enables users to attempt a set of questions retrieved from an XML file, allowing them to navigate through questions, choose answers, and submit their responses. Once submitted, the final score is displayed, and further changes to the answers are restricted.

## Files

- `index.html`: The main HTML file that displays the quiz interface.
- `script1.js`: The JavaScript file that handles the AJAX request, processes the XML data, and manages the quiz logic.
- `question_paper.xml`: An XML file containing the questions, options, and correct answers.

## How it Works

1. Open `index.html` in a web browser to start the quiz.
2. The application uses AJAX to retrieve questions from `question_paper.xml`.
3. Questions are presented one at a time, allowing users to select their answers.
4. Users can navigate between questions using "Next" and "Previous" buttons.
5. Once all questions are answered, users can submit their responses.
6. The application calculates the final score and displays it.
7. Further changes to answers are not allowed after submission.

## Implementation Details

- The quiz is designed to be user-friendly and intuitive, providing a seamless experience.
- The use of XML for storing questions allows for easy modification and expansion of the question set.
- JavaScript and AJAX are employed to create a dynamic and responsive quiz interface.

## Usage

1. Download or clone the project repository.
2. Open `index.html` in a web browser to start the quiz.

## Future Enhancements

- Implement user authentication to track individual progress and scores.
- Add a timer to limit the time for each question.
- Provide feedback for correct and incorrect answers.

## Credits

- [Soukarsha Moulik](https://github.com/soukarsha122) - Developer

## License

This project is licensed under the [MIT License](LICENSE).

