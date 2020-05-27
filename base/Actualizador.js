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
        create table variables(id serial, nombre varchar(50), valor varchar(50), primary key(id));
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Version') THEN
        insert into variables (nombre, valor) values ('Version', '${version}');
        END IF; END $$;`;
    consulta += `DO $$ BEGIN IF NOT EXISTS(SELECT * FROM variables
        WHERE nombre='Scanner') THEN
        insert into variables (nombre, valor) values ('Scanner', 'N');
        END IF; END $$;`;
    await client.query(consulta);
}

module.exports.Actualizar = Actualizar;