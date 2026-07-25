//dragging script not mine
      const img = document.getElementById("draggable");

      let isDragging = false;
      let offsetX, offsetY;
      let vely=0
      let x = window.innerWidth - img.offsetWidth
      let y =20
      const gravity= 0.5
      let floor = window.innerHeight - img.offsetHeight;
      
      img.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - img.offsetLeft;
        offsetY = e.clientY - img.offsetTop;
        
      });
      img.addEventListener("dblclick", () => {
            if(!isDragging){
              window.open("https://gameofdemocracy.org/party/116", "_blank");
            }
    });
      
      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
      
        img.style.left = `${e.clientX - offsetX}px`;
        img.style.top = `${e.clientY - offsetY}px`;
        x = e.clientX - offsetX;
        y = e.clientY - offsetY;
        
        
      });
      
      document.addEventListener("mouseup", () => {
        isDragging = false;
      });
      function getFloor(){
        return window.innerHeight - img.offsetHeight;
      }
      
      
      //gravity
      function update(){
        if (!isDragging) {
          vely+=gravity
          y+=vely
          
          img.style.left = `${x}px`;
          img.style.top = `${y}px`;
        }
        else{

        }
        if (y > getFloor()) {
          y = floor;
          vely = 0;
        }

        
        requestAnimationFrame(update);
      }
      update();
