App = {
    contracts: {},
    loading: false,

    load: async () => {
        await App.loadWeb3();
        await App.loadAccounts();
        await App.loadContract();
        await App.render(); 
    },
   
      // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
         window.addEventListener('load', async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            console.log("Loaded....")
            try {
                // Request account access if needed
                await ethereum.enable();
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */});
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider);
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */});
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
        });
    },

    loadAccounts: async () => {
        // connect to all the accounts, we want index 0 since, its the first account
        // the account we are connected to
        App.account = await ethereum.request({ method: 'eth_accounts' });
        console.log(App.account);
    },

    loadContract: async () => {
        // create a JS version of the contracts
        const todoList = await $.getJSON('TodoList.json')
        App.contracts.TodoList = TruffleContract(todoList)
        App.contracts.TodoList.setProvider(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
        // console.log(todoList);

        // Hydrate the smart contract with values from the blockchain
        App.todoList = await App.contracts.TodoList.deployed()
    },

    render: async () => {
        if (App.loading) {
            return;
        }

        // Update app loading state
        App.setLoading(true)

        // Render Account
        $('#account').html(App.account)

        // Render Vehicles
        await App.renderTasks()

        // Update loading state
        App.setLoading(false)
        },


    renderTasks: async () => {
        // load all the vehicles from the blockchain
        const taskCount = await App.todoList.taskCount();
        const $tackTemplate = $(".taskTemplate");

        // render each of the vehicle
        for (var i = 1; i <= taskCount; i++){
            const task = await App.todoList.tasks(i);
            const task_id = task[0].toNumber();
            const regNo = " Registration Number: " + task[1];
            const owner = "Owner: " + task[2];
            const task_content = "Model: " + task[3] + " |  Manufacturer: " + task[4]
            const task_completed = task[5]

            // Create the html for the vehicle
            const $newTaskTemplate = $tackTemplate.clone()
            $newTaskTemplate.find('.regNo').html(regNo)
            $newTaskTemplate.find('.owner').html(owner)
            $newTaskTemplate.find('.content').html(task_content)
            $newTaskTemplate.find('input')
                            .prop('name', task_id)
                            .prop('checked', task_completed)
                            .on('click', App.toggleCompleted)
    
            // Put the vehicle on the correct list
            if (task_completed) {
                $('#completedTaskList').append($newTaskTemplate)
            } else {
                $('#taskList').append($newTaskTemplate)
            }
    
            // Show the information
            $newTaskTemplate.show()
        }

    },


    setLoading: (boolean) => {
        App.loading = boolean;
        const loader = $('#loader');
        const content = $('#content');
        const inactive = $('#completedTaskList');
        if (boolean) {
            inactive.hide();
            loader.show();
            content.hide();
           
        } else {
            loader.hide();
            content.show();
            inactive.show();
        }
    },

    createTask: async () => {
        // On clicking submit in the add_details page, this function is called
        // It scrapes data from the input fields and creates a new entry on the blockchain based on the business logic specified in the smart contract
        App.setLoading(true);
        const regNo = $('#regNo').val();
        const owner = $('#owner').val();
        const model = $('#model').val();
        const manu = $('#manu').val();
        await App.todoList.createTask(regNo,owner,model,manu, { from: App.account[0] });
        window.location.href="index.html"
    },

    requestTask: async () => {
        //Testing functionality
        App.setLoading(true);
        const regNo = $('#regNo').val();
        const owner = $('#owner').val();
        const model = $('#model').val();
        const manu = $('#manu').val();
        await App.todoList.requestTask(regNo,owner,model,manu, { from: App.account[0] });
        window.location.href="index.html"
    },


    toggleCompleted: async (e) => {
        //This function will change the status of the vehicle
        App.setLoading(true)
        const taskId = e.target.name
        await App.todoList.toggleCompleted(taskId, { from: App.account[0] });
        window.location.reload()
    },
      
}

$(() => {
    $(window).load(() => {
        App.load();
    })
})

