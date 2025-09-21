function calcularDados(){
    const salarioBruto = parseFloat(document.getElementById("salarioBruto").value);
    const dependentes = parseInt(document.getElementById("dependentes").value);
    const pensaoAlimenticia = parseFloat(document.getElementById("pensaoAlimenticia").value);
    const outrosDescontos = parseFloat(document.getElementById("outrosDescontos").value);

    //Validar inputs
    if(isNaN(salarioBruto) || salarioBruto <= 0){
        alert("Informe um salário bruto válido")
        return;
    }
    if(isNaN(dependentes) || dependentes < 0){
        alert("Informe um número de dependentes válido")
        return;
    }
    if(isNaN(pensaoAlimenticia) || pensaoAlimenticia < 0){
        alert("Informe um valor de pensão alimentícia válido")
        return;
    }
    if(isNaN(outrosDescontos) || outrosDescontos < 0){
        alert("Informe um valor de descontos válido")
        return;
    }

    //Function INSS
    function calculoINSS(salarioBruto){
    let tetoINSS = 8157.41;

    if(salarioBruto<=1518.00){
        return salarioBruto * 0.075 - 0;
    }else if(salarioBruto<=2793.88){
        return salarioBruto * 0.09 - 22.77;
    }else if(salarioBruto<=4190.83){
        return salarioBruto * 0.12 - 106.59;
    }else if(salarioBruto<=8157.41){
        return salarioBruto * 0.14 - 190.40;
    }else if(salarioBruto>8157.41){
        return tetoINSS * 0.14 - 190.40;
    }
}

    //Function IRRF
    function calculoIRRF(salarioBruto, dependentes, pensaoAlimenticia, outrosDescontos, INSS){
    let valorDependentes = 189.59;
    let baseCalculo = salarioBruto - (INSS + pensaoAlimenticia + outrosDescontos + (dependentes * valorDependentes))

    if(baseCalculo<=2428.80){
        return baseCalculo * 0 - 0;
    }else if(baseCalculo<=2826.65){
        return baseCalculo * 0.075 - 182.16;
    }else if(baseCalculo<=3751.05){
        return baseCalculo * 0.15 - 394.16;
    }else if(baseCalculo<=4664.68){
        return baseCalculo * 0.225 - 675.49;
    }else if(baseCalculo>4664.68){
        return baseCalculo * 0.275 - 908.73;
    }
}

    //Function FGTS
    function calculoFGTS(salarioBruto){
        return salarioBruto * 0.08;
    }

    const INSS = calculoINSS(salarioBruto);
    const IRRF = calculoIRRF(salarioBruto, dependentes, pensaoAlimenticia, outrosDescontos, INSS)
    const FGTS = calculoFGTS(salarioBruto) 

    document.getElementById("resultadoCalculo").innerHTML = `
        <h4>INSS: R$ ${INSS.toFixed(2)}</h4>
        <h4>IRRF: R$ ${IRRF.toFixed(2)}</h4>
        <h4>FGTS: R$ ${FGTS.toFixed(2)}</h4>
        <h4>O Salário Liquido é R$ ${salarioBruto-(INSS+IRRF+pensaoAlimenticia-outrosDescontos).toFixed(2)}</h4>
    `
}