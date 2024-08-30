import { one_to_one, many_to_many, one_to_many, type_relation } from './functions.js' 

$("#div_table_db_pivote").hide();
$("#div_model_pivote").hide();

let case_relation = []

let validation_form = (pv_status) => {

    var table_1 = $('#table_1').val();
    var table_2 = $('#table_2').val(); 

    var model_1 = $('#model_1').val();
    var model_2 = $('#model_2').val(); 

    var relac_1 = $('#relac_1').val();
    var relac_2 = $('#relac_2').val();

    var pv_table = $('#table_db_pivote').val();

    if(pv_status == true){

        if(
            table_1 == '' || table_2 == '' || model_1 == '' || model_2 == ''
            || relac_1 == '' || relac_2 == '' || pv_table == ''
        ){

            return alert("Ups!, debe completar todos los campos!")
        }

    }else{

        if(
            table_1 == '' || table_2 == '' || model_1 == '' || model_2 == ''
            || relac_1 == '' || relac_2 == ''
        ){

            return alert("Ups!, debe completar todos los campos!")
        }
    }
    

}

$('#relac_1, #relac_2').change(function() {
     
    var relac_1 = $('#relac_1').val();
    var relac_2 = $('#relac_2').val();     

    let data = type_relation(relac_1, relac_2);
    
    $('#type_relation_title').html( 
        '<div class="alert alert-primary text-danger">'
            + data.msg +
        '</div>'        
    )
 
    case_relation = []
    case_relation.push(data.case)

    console.log('Case_relation -> ' +data.case +' '+case_relation[0])

    if (data.case == 2) {
        $("#div_table_db_pivote").show();
        $("#div_model_pivote").show();
      } else {
        $("#div_table_db_pivote").hide();
        $("#div_model_pivote").hide();

    } 

}); 


$(document).on('submit',function(e){   

    e.preventDefault()  

    // # Validacion de las Relaciones
    if(case_relation[0] == undefined || case_relation[0] == 0){
        return alert('Debe elegir tipo de Relacion ')
    }

    var table_1 = $('#table_1').val();
    var table_2 = $('#table_2').val(); 

    var model_1 = $('#model_1').val();
    var model_2 = $('#model_2').val(); 

    var pv_table = $('#table_db_pivote').val();

    let show_model_one_to_one =  (name_migration, foreignId, on ) => {

        //Code de la FK          
        $('#name_migration').html('Implementar en la migracion de: ' +name_migration)
        $('#code_migration').html(
            `
            <pre>
                <code class="code: php"> 
                    $table->unsignedBigInteger('`+foreignId+`')->unique();
                    $table->foreign('`+foreignId+`')
                        ->references('id')
                        ->on('`+on+`')
                        ->onDelete('cascade') 
                        ->onUpdate('cascade');
                </code>
            </pre>
            
            `            
        )
    }

    let show_model_many_to_many =  (name_migration, foreignId_1, foreignId_2, on_1, on_2 ) => {
        //Code de la FK          
        $('#name_migration').html('Implementar en la migracion de: ' +name_migration)
        $('#code_migration').html(
            `
            <pre>
                <code class="code: php"> 
                    $table->unsignedBigInteger('`+foreignId_1+`');
                    $table->unsignedBigInteger('`+foreignId_2+`');                
                </code>
            
                <code class="code: php"> 
                    $table->foreign('`+foreignId_1+`')->references('id')->on('`+on_1+`')->onDelete('cascade')->onUpdate('cascade');
                    $table->foreign('`+foreignId_2+`')->references('id')->on('`+on_2+`')->onDelete('cascade')->onUpdate('cascade');

                </code>
            </pre>
            
            `            
        )
    }
 
    let show_model_one_to_many =  (name_migration, foreignId, constrained ) => {
        //Code de la FK          
        $('#name_migration').html('Implementar en la migracion de: ' +name_migration)
        $('#code_migration').html(
            `
            <pre>
                <code class="code: php"> 
                    table->foreignId('`+foreignId+`')->constrained('`+constrained+`')->onDelete('cascade');                
                </code>
            </pre>
            
            `            
        )
    }

    let data;
    if(case_relation[0] == 1){ // # Case 1
        
        validation_form(false)

        data = one_to_one(table_1, table_2, model_1, model_2)
        show_model_one_to_one (data.name_migration, data.foreignId, data.on)
        console.log(letdata)        
    }

    if(case_relation[0] == 2){ // # Case 2

        validation_form(true)
        
        data = many_to_many(table_1, table_2, model_1, model_2, pv_table)
        show_model_many_to_many (data.name_migration, data.foreignId_1, data.foreignId_2, data.on_1, data.on_2)
        console.log(data)        
    }
    
    if(case_relation[0] == 3){// # Case 3

        validation_form(false)
        
        data = one_to_many(table_1, table_2, model_1, model_2)
        show_model_one_to_many (data.name_migration, data.foreignId, data.constrained)
        console.log(data)
    }    


    // # Model 1
    $('#text_model_1').text('Model '+model_1)
    $('#code_model_1').html(
        `
        <pre>
            <code class="code: php"> 
                public function `+data.name_func_model_1+`()
                {
                    return $this->`+data.type_func_model_1+`(`+data.return_func_model_1+`::class);

                }                
            </code>
        </pre>
        
        `            
    )

    // # Model 2
    $('#text_model_2').text('Model '+model_2)
    $('#code_model_2').html(
        `
        <pre>
            <code class="code: php"> 
                public function `+data.name_func_model_2+`()
                {
                    return $this->`+data.type_func_model_2+`(`+data.return_func_model_2+`::class);

                }                
            </code>
        </pre>
        
        `            
    )

        


  })
 //console.log(percent(1200, 15)) // ``


 