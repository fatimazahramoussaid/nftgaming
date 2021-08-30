// When the user clicks on div, open the popup
function show_popup_perfect() {
    var popup = document.getElementById("myPerfectPopup");
    popup.classList.toggle("show");
  }
  
  
  function show_popup_prime() {
    var popup = document.getElementById("myPrimePopup");
    popup.classList.toggle("show");
  }
  
  function show_popup_dark() {
    var popup = document.getElementById("myDarkPopup");
    popup.classList.toggle("show");
  }
  
  
  function hide_popup() {
    var popup = document.getElementById("myPrimePopup");
    popup.classList.remove("show");
    
    var popup = document.getElementById("myDarkPopup");
    popup.classList.remove("show");
    
    var popup = document.getElementById("myPerfectPopup");
    popup.classList.remove("show");
  }
  
  
  $( document ).ready(function() {
      var prime_counter   = 0;
      var dark_counter    = 0;
      var perfect_counter = 0;
      document.getElementById('separate').classList.add("separate_white");
      var href = window.location.href;
      var params = href.split('?');
      if(params.length > 1) {
          params = params[1];
          params = params.split('&');
          for (const param of params) {
              if(param.includes('prime_counter')) {
                  prime_counter = parseInt(param.replace('prime_counter=', ''));
              }
              if(param.includes('dark_counter')) {
                  dark_counter = parseInt(param.replace('dark_counter=', ''));
              }
              if(param.includes('perfect_counter')) {
                  perfect_counter = parseInt(param.replace('perfect_counter=', ''));
              }
          }
      
      
      }
      
       
      
      document.getElementById("perfect_counter").innerHTML = perfect_counter;
      document.getElementById("prime_counter").innerHTML = prime_counter;
      document.getElementById("dark_counter").innerHTML = dark_counter;
      
      var body = document.body;
      body.addEventListener('click', function(e){
          hide_popup();
      });
      
      
  });
  
  function next_round() {
      var somme_deg_right = parseFloat(document.getElementById("somme_deg_right").value);
      var somme_deg_left  = parseFloat(document.getElementById("somme_deg_left").value);
      var cpt_items_moved = parseFloat(document.getElementById("cpt_items_moved").value);
      var prime_counter   = parseFloat(document.getElementById("prime_counter").innerHTML);
      var dark_counter    = parseFloat(document.getElementById("dark_counter").innerHTML);
      var perfect_counter = parseFloat(document.getElementById("perfect_counter").innerHTML);
      
      if(Number.isNaN(cpt_items_moved)) {
          cpt_items_moved = 0;
      } 
      
      if(Number.isNaN(somme_deg_right)) {
          somme_deg_right = 0;
      } 
      
      if(Number.isNaN(somme_deg_left)) {
          somme_deg_left = 0;
      } 
      
      if(Number.isNaN(prime_counter)) {
          prime_counter = 0;
      } 
      
      if(Number.isNaN(dark_counter)) {
          dark_counter = 0;
      } 
      
      if(Number.isNaN(perfect_counter)) {
          perfect_counter = 0;
      } 
      
      
      if(cpt_items_moved < 6) {
          alert('one or more number not moved !');
          return;
      }
      
      if(somme_deg_right + somme_deg_left != 0) {
          alert('Not Equilibrium state !');
          return;
      }
      window.location.href = 'round3.html?prime_counter='+prime_counter+'&dark_counter='+dark_counter+'&perfect_counter='+perfect_counter;
  
  }
  
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.effectAllowed = "copyMove";
  }
  
  function drop(ev, id) {
      hide_popup();
      
      
      var specialNumber = 0;
      
      var div = document.getElementById('container-img-' + id).innerHTML;
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      var original = document.getElementById(data);
      var copyimg = document.createElement("img");
      
      if(original) {
          copyimg.src = original.src;
      }
      
      if(div.length > 0) {
          img = document.getElementById('container-img-' + id).getElementsByTagName( 'img' )[0];
          var img2 = document.getElementById(data);
          
          const path = img.src.split('/');
          var value1 = parseInt(path[path.length - 1].replace('.png', ''));
          
          const path2 = img2.src.split('/');
          var value2 = parseInt(path2[path2.length - 1].replace('.png', ''));
          
          var specialNumber = value1 + value2;
          if(specialNumber > 20) {
              alert("cannot exceed 20");
              return;
          }
          
          if(value1 == 6) {
              alert('cannot add weigth to perfect numbers !');
              return;
          }
          
          
          var newPath = img.src.replace(value1+'.png', specialNumber+'.png');
  
          img.setAttribute('src',newPath);
      }
      
     
      
      var weigth = original.src;
      
      var somme_deg_right = parseFloat(document.getElementById("somme_deg_right").value);
      var somme_deg_left  = parseFloat(document.getElementById("somme_deg_left").value);
      var cpt_items_moved = parseFloat(document.getElementById("cpt_items_moved").value);
      var prime_counter   = parseFloat(document.getElementById("prime_counter").innerHTML);
      var dark_counter    = parseFloat(document.getElementById("dark_counter").innerHTML);
      var perfect_counter = parseFloat(document.getElementById("perfect_counter").innerHTML);
      
      if(Number.isNaN(cpt_items_moved)) {
          cpt_items_moved = 0;
      } 
      
      if(Number.isNaN(somme_deg_right)) {
          somme_deg_right = 0;
      } 
      
      if(Number.isNaN(somme_deg_left)) {
          somme_deg_left = 0;
      } 
      
      if(Number.isNaN(prime_counter)) {
          prime_counter = 0;
      } 
      
      if(Number.isNaN(dark_counter)) {
          dark_counter = 0;
      } 
      
      if(Number.isNaN(perfect_counter)) {
          perfect_counter = 0;
      } 
      
      if(weigth.includes(".png")) {
          const path = weigth.split('/');
          var value = parseInt(path[path.length - 1].replace('.png', ''));
          
          if (id >= 1 && id <= 9) {
              degree = value*(10-id)/10;
          }
          if (id >= 10 && id <= 18) {
              degree = value*(9-id)/10;
          }
          
      }
      
      // prime number => no weight added
      array_primes = [2, 3, 5, 7, 11, 17, 19];
      array_darks = [13, 23];
      
      if(array_primes.includes(specialNumber)) {
          show_popup_prime();
          prime_counter ++;
          document.getElementById("prime_counter").innerHTML = prime_counter;
          //degree = 0;
      }
      
      if(array_darks.includes(specialNumber)) {
          show_popup_dark();
          dark_counter ++;
          document.getElementById("dark_counter").innerHTML = dark_counter;
          if (id >= 10 && id <= 18) {
              degree = -15;
          }
          if (id >= 1 && id <= 9) {
              degree = 15;
          }
          
      }
          
      if (id >= 10 && id <= 18) {
          somme_deg_left  = somme_deg_left + degree;
      }
      
      if (id >= 1 && id <= 9) {
          somme_deg_right = somme_deg_right + degree;
      }
      
      let olddegree = 0;
      if( data.includes("-right-copy")) {
          olddegree = original.getAttribute('olddegree');
          somme_deg_right = somme_deg_right - parseFloat(olddegree)
      }
      
      if( data.includes("-left-copy")) {
          olddegree = original.getAttribute('olddegree');
          somme_deg_left = somme_deg_left - parseFloat(olddegree)
      }
      
      
      if( specialNumber == 6) {
          somme_deg_right = 0;
          somme_deg_left = 0;
          perfect_counter ++;
          show_popup_perfect();
          document.getElementById("perfect_counter").innerHTML = perfect_counter;
          
      }
  
      
      var somme_deg   = somme_deg_left + somme_deg_right;
      document.getElementById("balance").style.transform = "rotate("+somme_deg+"deg)";
      
      ev.target.appendChild(copyimg);
      
      document.getElementById("somme_deg_left").value  = somme_deg_left;
      document.getElementById("somme_deg_right").value = somme_deg_right;
      
  
      
      if(somme_deg < 0.7 && somme_deg > -0.7 && somme_deg != 0) { 
          document.getElementById('separate').classList.remove("separate_white");
          document.getElementById('separate').classList.remove("separate_red");
          document.getElementById('separate').classList.remove("separate_green");
          document.getElementById('separate').classList.add("separate_orange");
      } else if(somme_deg == 0) {
          document.getElementById('separate').classList.remove("separate_white");
          document.getElementById('separate').classList.remove("separate_red");
          document.getElementById('separate').classList.remove("separate_orange");
          document.getElementById('separate').classList.add("separate_green");
      
      } else {
          document.getElementById('separate').classList.remove("separate_white");
          document.getElementById('separate').classList.remove("separate_green");
          document.getElementById('separate').classList.remove("separate_orange");
          document.getElementById('separate').classList.add("separate_red");
      }
  
      original.setAttribute('draggable', false);
      original.style.opacity = "0.4";
      if(! data.includes("-copy")) {
          data = data + "-copy";
          cpt_items_moved ++;
          document.getElementById("cpt_items_moved").value = cpt_items_moved;
      
      }
      
      if(document.getElementById(data) != null) {
          document.getElementById(data).remove();
          original.remove();
      }
      
      copyimg.setAttribute('draggable', true);
      copyimg.setAttribute('ondragStart',"drag(event)");
      copyimg.setAttribute('olddegree',degree);
      
      copyimg.setAttribute("id", data);
      
      somme_deg_right1 = String(somme_deg_right).substring(0,4);
      somme_deg_left1  = String(somme_deg_left*(-1)).substring(0,4);
      somme_deg1 = String(somme_deg).substring(0,6);
      //document.getElementById('degrees').innerHTML = somme_deg_left1 + '&#160;&#160;&#160;&#160;&#160;' + somme_deg1+ '&#160;&#160;&#160;&#160;&#160;' + somme_deg_right1;
      
  }