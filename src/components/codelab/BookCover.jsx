import React from "react";
import { registerHandlers, Handler } from "pagedjs";
function BookCover() {
  function afterPreview() {
    // var element = document.getElementById('setting');
    // var parent = element.parentNode;
    //
    // const button = document.getElementById('settings-button');
    // button.onclick = function () {
    //     if (settingsChangeCounter) setSettingsChangeCounter(false); else setSettingsChangeCounter(true);
    // };
    // let elementCopy = element.cloneNode(true);
    // parent.removeChild(element);
    // document.body.appendChild(elementCopy);
  }
  function encodeHTML(str) {
    var div = document.createElement("div");
    div.innerText = str;
    return div.innerHTML;
  }
  function createToc(config) {
    const className = config.className;
    const content = config.content;
    const tocElement = config.tocElement;
    const titleElements = config.titleElements;
    const filterContent = config.filterContent;
    let tocElementDiv = content.querySelector(tocElement);
    if (!tocElementDiv) return;
    let tocUl = document.createElement("ul");
    tocUl.id = "list-" + className + "-generated";
    tocElementDiv.appendChild(tocUl);
    // add class to all title elements
    let tocElementNbr = 0;
    for (let i = 0; i < titleElements.length; i++) {
      let titleHierarchy = i + 1;
      let titleElement = content.querySelectorAll(titleElements[i]);
      if (filterContent) {
        titleElement = Array.from(titleElement).filter((el) =>
          el.textContent.trim().startsWith(filterContent)
        );
      }
      titleElement.forEach(function (element) {
        // add classes to the element
        element.classList.add(className + "-" + "title-element");
        element.setAttribute("data-title-level", titleHierarchy);
        // add id if doesn't exist
        tocElementNbr++;
        let idElement = element.id;
        if (idElement == "") {
          element.id = className + "-" + "title-element-" + tocElementNbr;
        }
        let newIdElement = element.id;
      });
    }
    // create toc list
    let tocElements = content.querySelectorAll(
      "." + className + "-" + "title-element"
    );
    for (let i = 0; i < tocElements.length; i++) {
      let tocElement = tocElements[i];
      let tocNewLi = document.createElement("li");
      // Add class for the hierarcy of toc
      tocNewLi.classList.add(className + "-" + "element");
      tocNewLi.classList.add(
        className + "-element-level-" + tocElement.dataset.titleLevel
      );
      // Keep class of title elements
      let classTocElement = tocElement.classList;
      for (let n = 0; n < classTocElement.length; n++) {
        if (classTocElement[n] != className + "-" + "title-element") {
          tocNewLi.classList.add(classTocElement[n]);
        }
      }
      // Create the element
      tocNewLi.innerHTML =
        '<a href="#' +
        tocElement.id +
        '">' +
        encodeHTML(tocElement.innerText) +
        "</a>";

      tocUl.appendChild(tocNewLi);
    }
  }
  registerHandlers(
    class TOCHandler extends Handler {
      //Mục lục
      beforeParsed(content) {
        createToc({
          className: "toc",
          content: content,
          tocElement: "#my-toc",
          titleElements: ["h1", "h2", "h3", "toc"],
          filterContent: null,
        });
      }
    }
  );
  registerHandlers(
    class TOCHandler extends Handler {
      //Danh mục hình
      beforeParsed(content) {
        createToc({
          className: "toi",
          content: content,
          tocElement: "#my-toi",
          titleElements: ["p.Caption"],
          filterContent: "Hình",
        });
      }
    }
  );
  registerHandlers(
    class TOCHandler extends Handler {
      //Danh mục bảng
      beforeParsed(content) {
        createToc({
          className: "tot",
          content: content,
          tocElement: "#my-tot",
          titleElements: ["p.Caption"],
          filterContent: "Bảng",
        });
      }
    }
  );
  registerHandlers(
    class RepeatTableHeadersHandler extends Handler {
      //Lặp lại header của bảng
      constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
        this.splitTablesRefs = [];
      }

      afterPageLayout(pageElement, page, breakToken, chunker) {
        this.chunker = chunker;
        this.splitTablesRefs = [];

        if (breakToken) {
          const node = breakToken.node;
          const tables = this.findAllAncestors(node, "table");
          if (node.tagName === "TABLE") tables.push(node);

          if (tables.length > 0) {
            this.splitTablesRefs = tables.map((t) => t.dataset.ref);

            let thead =
              node.tagName === "THEAD"
                ? node
                : this.findFirstAncestor(node, "thead");
            if (thead) {
              let lastTheadNode = thead.hasChildNodes()
                ? thead.lastChild
                : thead;
              breakToken.node = this.nodeAfter(
                lastTheadNode,
                chunker.source
              );
            }

            this.hideEmptyTables(pageElement, node);
          }
        }
      }

      hideEmptyTables(pageElement, breakTokenNode) {
        this.splitTablesRefs.forEach((ref) => {
          let table = pageElement.querySelector(
            "[data-ref='" + ref + "']"
          );
          if (table) {
            let sourceBody = table.querySelector("tbody > tr");
            if (
              !sourceBody ||
              this.refEquals(sourceBody.firstElementChild, breakTokenNode)
            ) {
              table.style.visibility = "hidden";
              table.style.position = "absolute";
              let lineSpacer = table.nextSibling;
              if (lineSpacer) {
                lineSpacer.style.visibility = "hidden";
                lineSpacer.style.position = "absolute";
              }
            }
          }
        });
      }

      refEquals(a, b) {
        return (
          a &&
          a.dataset &&
          b &&
          b.dataset &&
          a.dataset.ref === b.dataset.ref
        );
      }

      findFirstAncestor(element, selector) {
        while (element.parentNode && element.parentNode.nodeType === 1) {
          if (element.parentNode.matches(selector))
            return element.parentNode;
          element = element.parentNode;
        }
        return null;
      }

      findAllAncestors(element, selector) {
        const ancestors = [];
        while (element.parentNode && element.parentNode.nodeType === 1) {
          if (element.parentNode.matches(selector))
            ancestors.unshift(element.parentNode);
          element = element.parentNode;
        }
        return ancestors;
      }

      layout(rendered, layout) {
        this.splitTablesRefs.forEach((ref) => {
          const renderedTable = rendered.querySelector(
            "[data-ref='" + ref + "']"
          );
          if (renderedTable) {
            if (!renderedTable.getAttribute("repeated-headers")) {
              const sourceTable = this.chunker.source.querySelector(
                "[data-ref='" + ref + "']"
              );
              this.repeatColgroup(sourceTable, renderedTable);
              this.repeatTHead(sourceTable, renderedTable);
              renderedTable.setAttribute("repeated-headers", true);
            }
          }
        });
      }

      repeatColgroup(sourceTable, renderedTable) {
        let colgroup = sourceTable.querySelectorAll("colgroup");
        let firstChild = renderedTable.firstChild;
        colgroup.forEach((colgroup) => {
          let clonedColgroup = colgroup.cloneNode(true);
          renderedTable.insertBefore(clonedColgroup, firstChild);
        });
      }

      repeatTHead(sourceTable, renderedTable) {
        let thead = sourceTable.querySelector("thead");
        if (thead) {
          let clonedThead = thead.cloneNode(true);
          renderedTable.insertBefore(
            clonedThead,
            renderedTable.firstChild
          );
        }
      }

      nodeAfter(node, limiter) {
        if (limiter && node === limiter) return;
        let significantNode = this.nextSignificantNode(node);
        if (significantNode) return significantNode;
        if (node.parentNode) {
          while ((node = node.parentNode)) {
            if (limiter && node === limiter) return;
            significantNode = this.nextSignificantNode(node);
            if (significantNode) return significantNode;
          }
        }
      }

      nextSignificantNode(sib) {
        while ((sib = sib.nextSibling)) {
          if (!this.isIgnorable(sib)) return sib;
        }
        return null;
      }

      isIgnorable(node) {
        return (
          node.nodeType === 8 ||
          (node.nodeType === 3 && this.isAllWhitespace(node))
        );
      }

      isAllWhitespace(node) {
        return !/[^\t\n\r ]/.test(node.textContent);
      }
    }
  );
  registerHandlers(
    class DisplayWordCountHandler extends Handler {
      constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
      }

      afterPageLayout(pageElement, page, breakToken, chunker) {
        this.chunker = chunker;

        // Iterate over all paragraphs in the page
        const paragraphs = pageElement.querySelectorAll("p");
        paragraphs.forEach((paragraph) => {
          this.addWordCountToLines(paragraph);
        });
      }

      addWordCountToLines(paragraph) {
        const words = paragraph.textContent.trim().split(/\s+/);
        const tempContainer = document.createElement("div");
        tempContainer.style.position = "absolute";
        tempContainer.style.visibility = "hidden";
        tempContainer.style.width = paragraph.clientWidth + "px";
        document.body.appendChild(tempContainer);

        let lineWordCount = 0;
        let lastOffsetTop = -1;
        const lines = [];

        words.forEach((word) => {
          const wordSpan = document.createElement("span");
          wordSpan.textContent = word + " ";
          tempContainer.appendChild(wordSpan);

          if (wordSpan.offsetTop !== lastOffsetTop) {
            if (lineWordCount > 0) {
              lines.push(lineWordCount);
            }
            lineWordCount = 0;
            lastOffsetTop = wordSpan.offsetTop;
          }
          lineWordCount++;
        });

        if (lineWordCount > 0) {
          lines.push(lineWordCount);

          // Check if last line has only one word
          if (lineWordCount === 1 && lines.length > 1) {
            // Add class "red" to pageElement
            paragraph.classList.add("red-text");
          }
        }
        document.body.removeChild(tempContainer);
      }
    }
  );
  registerHandlers(
    class imageRatio extends Handler {
      constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
      }

      afterParsed(parsed) {
        // create an array that will store the images data later on
        let imagePromises = [];
        // find all images parsed by paged.js
        let images = parsed.querySelectorAll("img");
        // for each image
        images.forEach((image) => {
          // load the image as an object
          let img = new Image();
          // test if the image is loaded
          let resolve, reject;
          let imageLoaded = new Promise(function (r, x) {
            resolve = r;
            reject = x;
          });
          // when the image loads
          img.onload = function () {
            // find its height
            let height = img.naturalHeight;

            // find its width
            let width = img.naturalWidth;

            // calculate the ratio
            let ratio = width / height;

            // if the ratio is superior than 1.4, set it as a lanscape adn add a class to the image (and to the parent figure)
            if (ratio >= 1.4) {
              image.classList.add("landscape");
              image.parentNode.classList.add("fig-landscape");
            }
            // if the ratio is inferior than 0.8, set it as a portrait adn add a class to the image (and to the parent figure)
            else if (ratio <= 0.8) {
              image.classList.add("portrait");
              image.parentNode.classList.add("fig-portrait");
            }
            // else, if it’s between 1.39 and 0.8, add a “square” class.
            else if (ratio < 1.39 || ratio > 0.8) {
              image.classList.add("square");
              image.parentNode.classList.add("fig-square");
            }
            // resolve the promise
            resolve();
          };
          // if there is an error, reject the promise
          img.onerror = function () {
            reject();
          };

          img.src = image.src;

          imagePromises.push(imageLoaded);
        });

        return Promise.all(imagePromises).catch((err) => {
          console.warn(err);
        });
      }
    }
  );
  return (
    <>
      <div id="trang1" className="break-after-page d-flex flex-column">
        <div className="d-flex justify-content-center">
          <div className="d-flex ms-4">
            <img
              src="/images/NEU.png"
              alt="logo"
              width="64"
              height="64"
            />
          </div>
          <div className="flex-fill d-flex flex-column justify-content-center">
            <div className="text-center fw-bold fs-6">
              TRƯỜNG ĐẠI HỌC KINH TẾ QUỐC DÂN
            </div>
            <div className="text-center fs-6">
              KHOA CÔNG NGHỆ THÔNG TIN
            </div>
          </div>
          <div id="cover-org-blank" className="me-4"></div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <div className="flex-fill d-flex flex-column justify-content-center">
            <div className="text-center fw-bold fs-6">
              TS. PHẠM XUÂN LÂM (Chủ biên)
            </div>
            <div className="text-center fs-6">
              ThS. Cao Thị Thu Hương - ThS. Chu Văn Huy
            </div>
            <div className="text-center fs-6">
              ThS. Phạm Đức Trung - ThS. Vũ Hưng Hải
            </div>
          </div>
        </div>
        <div
          className="d-flex justify-content-center flex-column"
          id="cover-book-info"
        >
          <div id="cover-book-name1">GIÁO TRÌNH</div>
          <div id="cover-book-name2">THIẾT KẾ WEB</div>
        </div>

        <div
          className="d-flex justify-content-center flex-column"
          id="cover-pub-info"
        >
          <div>NHÀ XUẤT ĐẠI HỌC KINH TẾ QUỐC DÂN</div>
          <div>HÀ NỘI - 2024</div>
        </div>
      </div>
      <div id="trang2" className="break-after-page d-flex flex-column">
        <div
          className="d-flex justify-content-center flex-column text-center"
          id="lastpage-book-info"
        >
          <div className="fw-bold fs-5">GIÁO TRÌNH</div>
          <div className="fw-bold fs-2">THIẾT KẾ WEB</div>
          <div className="hr">&nbsp;</div>
        </div>
        <div
          className="d-flex justify-content-center flex-column"
          id="lastpage-pub-info"
        >
          <div className="fw-bold">
            NHÀ XUẤT BẢN ĐẠI HỌC KINH TẾ QUỐC DÂN
          </div>
          <div>Địa chỉ: 207 đường Giải Phóng, Hai Bà Trưng, Hà Nội</div>
          <div>
            Website: https://nxb.neu.edu.vn &nbsp;&nbsp;&nbsp;&nbsp;Email:
            nxb@neu.edu.vn
          </div>
          <div>Điện thoại: (024) 36280280/ Máy lẻ 5722</div>
        </div>
        <div
          className="d-flex justify-content-center flex-column ms-4 me-4"
          id="lastpage-people-info"
        >
          <div className="d-flex justify-content-between">
            <div className="fw-bold fst-italic">
              Chịu trách nhiệm xuất bản:
            </div>
            <div className="d-flex flex-column align-items-end">
              <div>TS. ĐỖ VĂN SANG</div>
              <div className="fst-italic">
                Phó Giám đốc phụ trách Nhà xuất bản
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="fw-bold fst-italic">
              Chịu trách nhiệm nội dung:
            </div>
            <div className="d-flex flex-column align-items-end">
              <div>GS.TS. LÊ QUỐC HỘI</div>
              <div className="fst-italic">Tổng biên tập Nhà xuất bản</div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="fw-bold fst-italic">Biên tập:</div>
            <div>BÙI THỊ HẠNH</div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="fw-bold fst-italic">Thiết kế bìa:</div>
            <div>VƯƠNG NGUYỄN</div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="fw-bold fst-italic">Chế bản:</div>
            <div>PHẠM XUÂN LÂM</div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="fw-bold fst-italic">
              Sửa bản in và đọc sách mẫu:
            </div>
            <div>BÙI THỊ HẠNH</div>
          </div>
        </div>

        <div
          className="d-flex justify-content-center flex-column"
          id="lastpage-footer-info"
        >
          <div className="hr">&nbsp;</div>
          <div className="flex-fill d-flex flex-column justify-content-center">
            <div className="">
              In 300 cuốn, khổ 16x24 cm tại Công ty TNHH In và Thương mại
              Hải Nam.
            </div>
            <div className="">
              Địa chỉ: Số 18, ngách 68/53/9 Quan Hoa, quận Cầu Giấy, Hà
              Nội.
            </div>
            <div className="">
              Số xác nhận đăng ký xuất bản: 1328-2024/CXBIPH/3-98/ĐHKTQD.
            </div>
            <div className="">Mã số ISBN: 978-604-4983-03-5.</div>
            <div className="">
              Quyết định xuất bản số: 264 /QĐ-NXBĐHKTQD, Cấp ngày
              10/07/2024.
            </div>
            <div className="">
              In xong và nộp lưu chiểu quý III năm 2024.
            </div>
          </div>
        </div>
      </div>
      <div
        data-chapter="Mục lục"
        className="table-of-content break-after-page"
      >
        <div className="index-title step-title mucluc">MỤC LỤC</div>
        <div id="my-toc"></div>
      </div>
      <div
        data-chapter="Danh mục hình"
        className="table-of-content break-after-right"
      >
        <toc className="index-title step-title">DANH MỤC HÌNH</toc>
        <span id="my-toi"></span>
      </div>
      <div
        data-chapter="Danh mục bảng"
        className="table-of-content break-after-right"
      >
        <toc className="index-title step-title">DANH MỤC BẢNG</toc>
        <span id="my-tot"></span>
      </div>
    </>
  );
}

export default BookCover;
