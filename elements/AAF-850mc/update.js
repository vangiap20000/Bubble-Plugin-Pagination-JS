function(instance, properties, context) {
	const { primary_bg_color, primary_bg_hover_color, primary_text_color, primary_text_active_color,
            primary_border_color, border_radius, font_size, separation, num_total_items,
            num_per_page, show_previous_control, show_next_control, page_range,
            auto_hide_previous, auto_hide_next, prev_rext, next_text, ellipsis_text, show_page_numbers } = properties;
    
    		if (num_total_items <= num_per_page) return;
                  
            runMain();
            setStyles();
    
    	   	function runMain() {
                instance.canvas.append(getContentPagination());
            }

    
            function getContentPagination(){
                let $box = $("<div class='pagination'></div>");
                $box.append('<div id="pagination-container"></div>');
                return $box;
            }


            function setStyles() {
                let style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = `
						.pagination {
							display: flex;
                            justify-content: center;
                            align-items: center;
						}

   						.pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-pages li {
                            border-color: ${primary_border_color};
                        }

                        .pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-pages li>a {
                            color: ${primary_border_color};
                            font-size: ${font_size};
                        }

                        .pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-pages li>a:hover {
                            background: ${primary_bg_hover_color};
                        }

                        .pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-pages li.active>a {
                            background: ${primary_bg_color};
                            color: ${primary_text_active_color};
                        }

                        .pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-pages li.disabled>a:hover {
                            background: 0 0;
                        }

                        .pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-go-input>input[type=text],
                        .pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-size-changer>select {
                            border-color: ${primary_border_color};
                        }

                        .pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-go-button>input[type=button] {
                            background: ${primary_bg_color};
                            border-color: ${primary_border_color};
                            color: ${primary_text_color};
                        }

                        .pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-go-button>input[type=button]:hover {
                            background-color: ${primary_bg_hover_color};
                        }

                        ${(separation === '0px') 
                            ? `
                            .pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-pages li:last-child>a {
                                border-radius: 0 ${border_radius} ${border_radius} 0;
                            }

                            .pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-pages li:first-child, 
                            .pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-pages li:first-child>a {
                                border-radius: ${border_radius} 0 0 ${border_radius};
                            }

                            .pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-pages li:last-child {
                                border-radius: 0 ${border_radius} ${border_radius} 0;
                            }
                            `
                            : `
                            .pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-pages li {
                                border-right: 1px solid ${primary_border_color};
                            }
                        `}

                        .pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-pages ul {
                            display: flex;
                            column-gap: ${separation};
                        }

                        ${(separation !== '0px')
                            ? `
                                .pagination_Gjs.custom-pagination_Gjs .pagination_Gjs-pages li,
                                .pagination_Gjs .pagination_Gjs-pages li:first-child, .pagination_Gjs .pagination_Gjs-pages li:first-child>a {
                                    border-radius: ${border_radius};
                                    overflow: hidden;
                                }
                            `
                            : ''
                        }
                `;
                document.getElementsByTagName('head')[0].appendChild(style);
            }

        const paginationContainer = document.createElement("div");
        paginationContainer.id = "pagination-container";
        document.body.appendChild(paginationContainer);

        function makeArray(count) {
            return Array.from({ length: count }, (_, index) => index);
        }
		
        $('#pagination-container').pagination_G({
            dataSource: makeArray(num_total_items),
            pageSize: num_per_page,
            showPrevious: show_previous_control,
            showNext: show_next_control,
            pageRange: page_range,
            autoHidePrevious: auto_hide_previous,
            autoHideNext: auto_hide_next,
            showPageNumbers: show_page_numbers,
            className: 'custom-pagination_Gjs',
            prevText: prev_rext,
            nextText: next_text,
            ellipsisText: ellipsis_text,
            callback: function (data, pagination) {
                const { pageNumber, totalNumber } = pagination;
                const offset = (pageNumber - 1) * num_per_page + 1;
                
                instance.publishState("current_page", pageNumber);
                instance.publishState("total_record", totalNumber);
                instance.publishState("offset", offset);
                           
              	instance.triggerEvent("change", (err) => {
                    if (err) {
                      console.error(
                        "Pagination js event error - please report to admin: " +
                          JSON.stringify(err)
                      );
                    }
              });                
            }
            
        }); 
}