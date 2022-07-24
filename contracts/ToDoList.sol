pragma solidity ^0.5.0;
// if you write a new function to the contract u should first migrate it
// to the blockchain by typing " truffle migrate --reset "

contract ToDoList {

    uint public taskCount = 0; 
    uint public requestCount = 0;

    struct Task {
        uint id;
        string regNo;
        string owner;
        string model;
        string manu;
        bool completed;
    }

    struct Request {
        uint id;
        string regNo;
        string owner;
        string model;
        string manu;
        string status;
    }

    mapping (uint => Task) public tasks;
    mapping (uint => Request) public requests;

    event TaskRequest(
        uint id,
        string regNo,
        string owner,
        string model,
        string manu,
        string status
    );

    event TaskCreated(
        uint id,
        string regNo,
        string owner,
        string model,
        string manu,
        bool completed
    );

    event TaskCompleted(
        uint id,
        bool completed
    );

    event RequestCompleted(
        uint id,
        string status
    );


    constructor() public {
        createTask("91169 MCT","Adharsh","R8","Audi");
    }

    function requestTask(string memory _regNo,string memory _owner,string memory _model,string memory _manu) public {
        requestCount ++;
        requests[requestCount] = Request(requestCount,_regNo,_owner,_model,_manu,"0");
        emit TaskRequest(requestCount,_regNo,_owner,_model,_manu,"0");
    }

    function createTask(string memory _regNo,string memory _owner,string memory _model,string memory _manu) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount,_regNo,_owner,_model,_manu,false);
        emit TaskCreated(taskCount,_regNo,_owner,_model,_manu,false);
    }

    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id,_task.completed);
    }

    function statusCompleted(uint _id,string memory choice) public {
        Request memory _request = requests[_id];
        string memory choce = choice;
        string memory v = "true";
        if (keccak256(bytes(choce)) == keccak256(bytes(v))) {
            _request.status = "Verified";
        }
        else{
            _request.status = "Rejected";
        }
        emit RequestCompleted(_id,_request.status);
    }
    
}

