const { Client } = require('pg');
let client;

async function Actualizar(base, version) {

    client = new Client(base);

    await client.connect(err => {
        if (err) {
            console.error('Error al correr actualizador.', err.stack);
        } else {
            console.log('Actualizador corriendo.');
            ActualizarBase(version);
        }
    });
}

async function ActualizarBase(version) {

    await ActualizadorINC0010();
    await ActualizadorINC0013(version);
    await ActualizadorINC0015();
    await ActualizadorINC0018();

    await ActualizarVersion(version);
    console.log("Base actualizada");
    await client.end();

}

async function ActualizarVersion(version) {
    var consulta = `update variables set valor = '${version}' where nombre = 'Version';`;
    await client.query(consulta);
}

async function ActualizadorINC0010() {

    var consulta = `DO $$ BEGIN IF EXISTS(SELECT * FROM information_schema.columns
        WHERE table_name='items' and column_name='precio') THEN
        alter table items rename column precio to precio_venta; 
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM information_schema.columns
        WHERE table_name='items' and column_name='precio_costo') THEN
        alter table items add column precio_costo decimal; 
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM information_schema.columns
        WHERE table_name='items' and column_name='ganancia') THEN
        alter table items add column ganancia decimal;
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM information_schema.columns
        WHERE table_name='ventas' and column_name='ganancia') THEN
        alter table ventas add column ganancia decimal;
        END IF; END $$;`;
    await client.query(consulta);
}

async function ActualizadorINC0013(version) {

    var consulta = `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM information_schema.columns
        WHERE table_name='variables') THEN
        create table variables(id serial, nombre varchar(50), valor varchar(50), tipo varchar(10), primary key(id));
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Version') THEN
        insert into variables (nombre, valor, tipo) values ('Version', '${version}', 'texto');
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Scanner') THEN
        insert into variables (nombre, valor, tipo) values ('Scanner', 'N', 'texto');
        END IF; END $$;`;
    await client.query(consulta);
}

async function ActualizadorINC0015() {

    var consulta = `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Color sidebar') THEN
        insert into variables (nombre, valor, tipo) values ('Color sidebar', 'blue', 'color');
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Color navbar') THEN
        insert into variables (nombre, valor, tipo) values ('Color navbar', 'blue', 'color');
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Color tabla') THEN
        insert into variables (nombre, valor, tipo) values ('Color tabla', 'blue', 'color');
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Color boton aceptar') THEN
        insert into variables (nombre, valor, tipo) values ('Color boton aceptar', 'green', 'color');
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Color boton cancelar') THEN
        insert into variables (nombre, valor, tipo) values ('Color boton cancelar', 'grey', 'color');
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Color boton editar') THEN
        insert into variables (nombre, valor, tipo) values ('Color boton editar', 'black', 'color');
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Color boton eliminar') THEN
        insert into variables (nombre, valor, tipo) values ('Color boton eliminar', 'red', 'color');
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Color boton agregar') THEN
        insert into variables (nombre, valor, tipo) values ('Color boton agregar', 'blue', 'color');
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Color boton buscar') THEN
        insert into variables (nombre, valor, tipo) values ('Color boton buscar', 'grey', 'color');
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Color boton imprimir') THEN
        insert into variables (nombre, valor, tipo) values ('Color boton imprimir', 'teal', 'color');
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Color boton salir') THEN
        insert into variables (nombre, valor, tipo) values ('Color boton salir', 'red', 'color');
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Color boton vender') THEN
        insert into variables (nombre, valor, tipo) values ('Color boton vender', 'green', 'color');
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Color boton guardar') THEN
        insert into variables (nombre, valor, tipo) values ('Color boton guardar', 'blue', 'color');
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Color icono categoria') THEN
        insert into variables (nombre, valor, tipo) values ('Color icono categoria', 'blue', 'color');
        END IF; END $$;`;

    await client.query(consulta);
}

async function ActualizadorINC0018() {

    var consulta = `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Color boton estadistica') THEN
        insert into variables (nombre, valor, tipo) values ('Color boton estadistica', 'blue', 'color');
        END IF; END $$;`;
    await client.query(consulta);
}

module.exports.Actualizar = Actualizar;