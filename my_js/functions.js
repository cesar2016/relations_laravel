
let one_to_one = (table_1, table_2, model_1, model_2) => { // Case 1 

    return {
         
        name_func_model_1: table_2,
        return_func_model_1: model_2,
        type_func_model_1: 'hasOne',
        
        name_func_model_2: table_1,
        return_func_model_2: model_1, 
        type_func_model_2: 'hasOne',

        // Script para la Migration
        name_migration: model_2,
        foreignId: convert_firts_word(model_1)+'_id',
        on: table_1
    }
    
}  

let many_to_many =  (table_1, table_2, model_1, model_2, pv_table) => { // Case 2

    return {
         
        name_func_model_1: table_2,
        return_func_model_1: model_2,
        type_func_model_1: 'belongsToMany',
        
        name_func_model_2: table_1,
        return_func_model_2: model_1, 
        type_func_model_2: 'belongsToMany',

        // Script para la Migration
        name_migration: pv_table,
        foreignId_1: convert_firts_word(model_1)+'_id',
        foreignId_2: convert_firts_word(model_2)+'_id',
        on_1: table_1,
        on_2: table_2

    }
     
}  

let one_to_many =  (table_1, table_2, model_1, model_2) => { // Cadate_se 3

    return {
         
        name_func_model_1: table_2,
        return_func_model_1: model_2,
        type_func_model_1: 'hasMany',
        
        name_func_model_2: table_1,
        return_func_model_2: model_1, 
        type_func_model_2: 'belongsTo',

        // Script para la Migration
        name_migration: model_2,
        foreignId: model_1+'_id',
        constrained: table_1
    }
    
}
 

// Convertir Inicial en minuscula
function convert_firts_word(cadena) {
    return cadena.charAt(0).toLowerCase() + cadena.slice(1);
}

let type_relation =  (relac_1, relac_2) => { 

    if(relac_1 == '' || relac_2 == '' )

        return {
            msg: 'Loading ...',
            case: 0
        }

        
        if(relac_1 == 'hasOne' && relac_2 == 'hasOne' ){ 

            return {
                msg: 'Relacion de UNO a UNO - (One to One)',
                case: 1
            }
           
        }

        if(relac_1 == 'hasMany' && relac_2 == 'hasMany' ){ 

            return {
                msg: 'Relacion de MUCHOS a MUCHOS - (Many to Many)',
                case: 2
            }
           
        }

        if(relac_1 == 'hasOne' && relac_2 == 'hasMany' ){ 

            return {
                msg: 'Relacion de UNO a MUCHOS - (One to Many)',
                case: 3
            }
           
        } 
}


 
export {one_to_one, many_to_many, one_to_many, type_relation}