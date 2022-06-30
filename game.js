document.addEventListener('DOMContentLoaded', () =>  {
    const gameboard = document.querySelector('.gameboard');
    const score_lbl = document.getElementById('score');
    const result_lbl = document.getElementById('result');

    let squares = [];
    const width = 4;
    let score = 0;

    create_board();
    document.addEventListener('keyup', keyboard);
    colors();
    var myTimer = setInterval(colors, 50);

    function create_board()
    {
        for (let i=0; i < width*width; i++)
        {
            square = document.createElement('div');
            square.innerHTML = 0;
            gameboard.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }

    function generate()
    {
        randomNumber = Math.floor(Math.random() * squares.length);
        if(squares[randomNumber].innerHTML == 0) 
        {
            squares[randomNumber].innerHTML = 2;
            is_game_over();
        }
        else
        {
            generate();
        }
    }

    function colors()
    {
        for (let i = 0; i < squares.length; i++)
        {
            if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192';
            else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#eee4da';
            else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#ede0c8';
            else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#f2b179';
            else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#ffcea4'; 
            else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#e8c064'; 
            else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#ffab6e'; 
            else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#fd9982'; 
            else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#ead79c'; 
            else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#76daff'; 
            else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#beeaa5'; 
            else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#d7d4f0';
        }
    }

    function is_game_over()
    {
        for (let i = 0; i < squares.length; i++)
        {
            if (squares[i].innerHTML == 2048)
            {
                result_lbl.innerHTML = "Wygrana!";
                document.removeEventListener('keyup', keyboard);
                setTimeout(() => clear(), 3000);
            }
        }
    }

    function is_game_win()
    {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++)
        {
            if (squares[i].innerHTML == 0)
            {
                zeros++;
            }
        }

        if (zeros === 0)
        {
            result_lbl.innerHTML = "Przegrana";
            document.removeEventListener('keyup', keyboard);
            setTimeout(() => clear(), 3000);
        }

    }

    function clear()
    {
        clearInterval(myTimer);
    }

    function move_up()
    {
        for (let i = 0; i < 4; i++)
        {
            let firstColumn = squares[i].innerHTML;
            let secondColumn = squares[i+width].innerHTML;
            let thirdColumn = squares[i+(width*2)].innerHTML;
            let fourthColumn = squares[i+(width*3)].innerHTML;
            let column = [parseInt(firstColumn), parseInt(secondColumn),parseInt(thirdColumn),parseInt(fourthColumn)]

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width*2)].innerHTML = newColumn[2];
            squares[i + (width*3)].innerHTML = newColumn[3];
        }
    }

    function move_down()
    {
        for (let i = 0; i < 4; i++)
        {
            let firstColumn = squares[i].innerHTML;
            let secondColumn = squares[i+width].innerHTML;
            let thirdColumn = squares[i+(width*2)].innerHTML;
            let fourthColumn = squares[i+(width*3)].innerHTML;
            let column = [parseInt(firstColumn), parseInt(secondColumn),parseInt(thirdColumn),parseInt(fourthColumn)]

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width*2)].innerHTML = newColumn[2];
            squares[i + (width*3)].innerHTML = newColumn[3];
        }
    }

    function move_left()
    {
        for (let i = 0; i < 16; i++)
        {
            if (i % 4 === 0)
            {
                let firstRow = squares[i].innerHTML;
                let secondRow = squares[i + 1].innerHTML;
                let thirdRow = squares[i + 2].innerHTML;
                let fourthRow = squares[i + 3].innerHTML;
                let row = [parseInt(firstRow), parseInt(secondRow),parseInt(thirdRow),parseInt(fourthRow)]

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function move_right()
    {
        for (let i = 0; i < 16; i++)
        {
            if (i % 4 === 0)
            {
                let firstRow = squares[i].innerHTML;
                let secondRow = squares[i + 1].innerHTML;
                let thirdRow = squares[i + 2].innerHTML;
                let fourthRow = squares[i + 3].innerHTML;
                let row = [parseInt(firstRow), parseInt(secondRow),parseInt(thirdRow),parseInt(fourthRow)]

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function combine_row()
    {
        for (let i = 0; i < 15; i++)
        {
            if(squares[i].innerHTML === squares[i + 1].innerHTML)
            {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;
                score += combinedTotal;
                score_lbl.innerHTML = score;
            }
        }

        is_game_win();
    }

    function combine_column()
    {
        for (let i = 0; i < 12; i++)
        {
            if(squares[i].innerHTML === squares[i + width].innerHTML)
            {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;
                score += combinedTotal;
                score_lbl.innerHTML = score;
            }
        }

        is_game_win();
    }

    function keyboard(e) {
        if(e.keyCode === 37) 
        {
            move_left();
            combine_row();
            move_left();
            generate();
        }
        if(e.keyCode === 38) 
        {
            move_up();
            combine_column();
            move_up();
            generate();
        }
        if(e.keyCode === 39)
        {
            move_right();
            combine_row();
            move_right();
            generate();
        }
        if(e.keyCode === 40)
        {
            move_down();
            combine_column();
            move_down();
            generate();
        }
    }


});