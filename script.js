//dragging script not mine
      const img = document.getElementById("draggable");
      let isDragging = false;
      let offsetX, offsetY;
      let vely=0
      let x = window.innerWidth - img.offsetWidth
      let y =20
      const gravity= 0.5
      let floor = window.innerHeight - img.offsetHeight;

      const status_text= document.getElementById("status_text")
      const status_emoji_text= document.getElementById("status_emoji_text")
      let status
      let status_emoji
      
      img.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - img.offsetLeft;
        offsetY = e.clientY - img.offsetTop;
        
      });

    img.addEventListener("dblclick", () => {
      if (!moved) {
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

      fetch("https://api.lanyard.rest/v1/users/1502331641736073326")
      .then(response => response.json())
      .then(data => {
          console.log(data.data.discord_status);
  
          const activities = data.data.activities;
  
          const customStatus = activities.find(
              activity => activity.type === 4
          );
  
          if (customStatus) {
              let status=customStatus.state
              status_text.textContent=status
              let status_emoji=customStatus.emoji.name
              status_emoji_text.textContent=status_emoji
          }
      });
      
      //gravity
      function update(){
        if (!isDragging) {
          vely+=gravity
          y+=vely
          
          img.style.left = `${x}px`;
          img.style.top = `${y}px`;
        }

        if (y > getFloor()) {
          y = getFloor();
          vely = 0;
        }

        
        requestAnimationFrame(update);
      }
      update();
