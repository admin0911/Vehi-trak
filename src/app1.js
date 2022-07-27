search_id = []
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

        // Render Tasks
        // await App.renderTasks()

        // Update loading state
        App.setLoading(false)
        },



    setLoading: (boolean) => {
        App.loading = boolean;
        const loader = $('#loader');
        const content = $('#content');
        const inactive = $('#completedTaskList');
        if (boolean) {
            loader.show();
            inactive.hide();
            content.hide();
           
        } else {
            loader.hide();
            content.show();
            inactive.show();
        }
    },



    toggleCompleted: async (e) => {
        App.setLoading(true)
        const taskId = e.target.name
        await App.todoList.toggleCompleted(taskId, { from: App.account[0] });
        window.location.reload()
    },
    
    

    SearchrenderTasks: async () => {
        // Will search for vehicle information based on owner or registration number
        const searchReg = $('#FindTask').val();
        // console.log(searchReg)
        var flag = 0
        const taskCount = await App.todoList.taskCount();
        // console.log(search_id)

        
        for (var i = 1; i <= taskCount; i++){
            const vehi = await App.todoList.tasks(i)
            const regNo = vehi[1];
            flag+=1

            if (regNo == searchReg || vehi[2] == searchReg) 
            {
                for (var j = 0; j <= search_id.length; j++){
                    // console.log("search value = ",search_id[j],"  id = ",vehi[0].toNumber())
                    if ( search_id[j] == vehi[0].toNumber() ){
                        // console.log(vehi[0].toNumber(),"Already there")
                        return
                    }
                }
                flag -=1
                // console.log(vehi[0].toNumber(),"New")
                // console.log(flag)
                const vehi_id = vehi[0].toNumber();
                search_id.push(vehi_id)
                const regNo = vehi[1];
                const owner = "Owner: " + vehi[2];
                const vehi_content = "Model: " + vehi[3] + " |  Manufacturer: " + vehi[4]
                const vehi_completed = vehi[5]

                // const $newTaskTemplate = $tackTemplate.clone()
                const $newTaskTemplate = $('.taskTemplate').last().clone()
                $newTaskTemplate.find('.regNo').html(regNo)
                $newTaskTemplate.find('.owner').html(owner)
                $newTaskTemplate.find('.data').html(vehi_content)
                $newTaskTemplate.find('input')
                                .prop('name', vehi_id)
                                .prop('checked', vehi_completed)
                                .on('click', App.toggleCompleted)

                // Put the vehicle on the correct list
                if (vehi_completed) {

                    // App.setLoading(false)
                    $('#completedTaskList').append($newTaskTemplate)
                } else {
                    // App.setLoading(false)
                    $('#taskList').append($newTaskTemplate)
                }
    
                // Show the information
                $newTaskTemplate.show()
            }
        }
        
        if (flag == taskCount) {
            alert(searchReg+" not Found") //incase details are not present on the blockchain
        }

    }
}

$(() => {
    $(window).load(() => {
        App.load();
    })
})

