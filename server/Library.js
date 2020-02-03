// object that manages our library - Class

// functions tht can edit above objects (Split into method)
// borrow a book (POST)
// return a book (POST)
// add a book (POST)
// display the current inventory (GET)
// open/close library (POST)

class Library {
  constructor(inventory) {
    this.inventory = inventory;
    this.open = true;
    this.lent = [];
  }
  borrow(id) {
    //Challenge 1: fix the Borrow Bug
    const isInInventory = this.inventory.find(function(item) {
      return item.id === id;
    });
    if (!isInInventory) {
      return "Sorry but this library doesn't have that book";
    }
    //^Challenge 1: fix the Borrow Bug^
    if (this.open) {
      if (isInInventory && this.lent.indexOf(id) === -1) {
        this.lent.push(id);
        return "Yay you have borrowed the book with id: " + id;
      } else {
        return "This book has been lent...";
      }
    } else {
      return "Sorry please come back when the library is open";
    }
  }
  return(id) {
    let removeIndex = this.lent.findIndex(function(currentId) {
      return currentId === id;
    });
    if (removeIndex >= 0) {
      this.lent.splice(removeIndex, 1);
      return (
        "Thank-You for being responsible and returning the book with id: " + id
      );
    } else {
      return "This book has not been borrowed";
    }
  }
  toggleOpen() {
    this.open = !this.open;
    let message = this.open
      ? "The Library is now open"
      : "The library in now closed";
    return message;
  }
  addBook(title, author) {
    const newBook = {
      title: title,
      author: author,
      id: this.inventory.length + 1
    };
    this.inventory.push(newBook);
    return (
      "You have succesfully added " +
      title +
      " by " +
      author +
      " to the library's inventory"
    );
  }
}

//# sourceMappingURL=Library.js.map

module.exports = Library;
