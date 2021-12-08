$(document).ready(function () {

    // Agrego el evento click al elemento que tenga el id agregarLinea.
    $("#agregarLinea").click(function (event) {

        event.preventDefault();

        $("#base-imponible").text('0');
        $("#iva").text('0');
        $("#facturaTotal").text('0');

        // Obtengo los valores de sus correspondientes id con val().
        let producto = $("#producto").val();
        let cantidad = $("#cantidad").val();
        let precioUnitario = $("#precio-unitario").val();
        let descuento = $("#descuento").val();
        let precioTotal = $("#total-linea").val();

        // Relleno la tabla seleccionando tbody y insertando con append.
        $("tbody").append('<tr id="productos"><td id="producto">' + producto + '</td><td id="cantidadProducto">' + cantidad + '</td><td id="precioUnitarioProducto">' + precioUnitario + '</td><td id="descuentoProducto">' + descuento + '</td><td id="precioTotalProducto">' + precioTotal + '€</td><td>' + '<a href="#borrar" id="borrar" class="btn btn-danger">Borrar</a>' + '</td></tr>');

        // Limpia el formulario una vez introduzca un producto.
        $("#producto").val('');
        $("#cantidad").val(''); 
        $("#precio-unitario").val(''); 
        $("#descuento").val(''); 
        $("#total").val(''); 

        // Itero la tabla.
        $("tbody").find("td").each(function () {

            // Si tiene como atributo id precioTotalFila, hago cálculos para mostrar base imponible, iva y total.
            if ($(this).attr("id") === "precioTotalProducto") { 

                let precioTotalFinal = $(this).parents("tr").find("#precioTotalProducto").eq(0).html();
                let baseImponible1 = parseFloat($("#base-imponible").text());

                $("#base-imponible").text((parseFloat(baseImponible1) + parseFloat(precioTotalFinal)).toFixed(2));
                let baseImponible2 = parseFloat($("#base-imponible").text());

                let iva = (parseFloat(baseImponible2) * 21) / 100;
                $("#iva").text(parseFloat(iva).toFixed(2));

                $("#total").text((parseFloat(iva) + parseFloat(baseImponible2)).toFixed(2));
            }
        });

        // Muestro historial de productos añadidos añadiendo fecha y hora.
        let dia = new Date();
        let time = producto + " añadido el " + dia.getUTCDate() + "/" + (dia.getUTCMonth() + 1) + "/" + dia.getUTCFullYear() + " a las " + dia.getHours() + ":" + dia.getMinutes() + ":" + dia.getSeconds();
        $(".container").append("<p class='text-danger'>" + time + "</p>");
    });

    // Calculo el precio total de fila.
    $("input").blur(function () {  
        let precioTotal = (($("#cantidad").val()) * ($("#precio-unitario").val()));
        let precioDescuento = (($("#cantidad").val()) * ($("#precio-unitario").val()) * (($("#descuento").val())) / 100);
        let precioTotalFila = (precioTotal.toFixed(2) - precioDescuento);
        $('#total-linea').val(precioTotalFila.toFixed(2));
    });

    // Evento click para el el id borrar.
    $(document).on('click', '#borrar', function (event) {
        event.preventDefault();

        $(this).closest('tr').remove();

        // Pongo a cero el elemento con dichos id.
        $("#base-imponible").text('0');
        $("#iva").text('0');
        $("#total").text('0');

        // Itero la tabla.
        $("tbody").find("td").each(function () {
            if ($(this).attr("id") === "precioTotalProducto") {

                let precioTotalFinal = $(this).parents("tr").find("#precioTotalProducto").eq(0).html();
                let baseImponible1 = parseFloat($("#base-imponible").text());
                $("#base-imponible").text((parseFloat(baseImponible1) + parseFloat(precioTotalFinal)).toFixed(2));
                let baseImponible2 = parseFloat($("#base-imponible").text());

                let iva = (parseFloat(baseImponible2) * 21) / 100;
                $("#iva").text(parseFloat(iva).toFixed(2));
 
                $("#total").text((parseFloat(iva) + parseFloat(baseImponible2)).toFixed(2));
            }
        });
    });
    // Agrego el evento click al elemento que tenga el id aplicarDescuento
    $("#aplicarDescuento").click(function (event) {
        event.preventDefault();
        let descuento = $("#descuento-lineas").val();
        $("#descuentoProducto").text(descuento);
    });
});
