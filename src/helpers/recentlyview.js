export const saveToRecentlyViewed = (item) => {
    let recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewedItems")) || [];
  
    // Kiểm tra trùng lặp dựa trên `slug` để tránh lưu trùng
    const isAlreadyViewed = recentlyViewed.some(viewedItem => viewedItem.slug === item.slug);
    
    if (!isAlreadyViewed) {
      recentlyViewed.push(item);
      localStorage.setItem("recentlyViewedItems", JSON.stringify(recentlyViewed));
    }
  };
export const saveToMyList = (item) => {
    let myList = JSON.parse(localStorage.getItem("myListItems")) || [];
  
    // Kiểm tra trùng lặp dựa trên `slug` để tránh lưu trùng
    const isAlreadyViewed = myList.some(viewedItem => viewedItem.slug === item.slug);
    
    if (!isAlreadyViewed) {
      myList.push(item);
      localStorage.setItem("myListItems", JSON.stringify(myList));
    }
  };
export const removeFromMyList = (item) => {
    let myList = JSON.parse(localStorage.getItem("myListItems")) || [];
  
    const updatedList = myList.filter(viewedItem => viewedItem.slug !== item.slug);
    localStorage.setItem("myListItems", JSON.stringify(updatedList));
  };