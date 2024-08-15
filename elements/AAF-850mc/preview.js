function(instance, properties) {
        $('head').append('<link rel="stylesheet" href="https://meta-q.cdn.bubble.io/f1723626697928x385660223026664800/pagination_G.min.css"/>');
        const { primary_bg_color, primary_bg_hover_color, primary_text_color, primary_text_active_color,
            primary_border_color, border_radius, font_size, separation, num_total_items,
            num_per_page, show_previous_control, show_next_control, page_range,
            auto_hide_previous, auto_hide_next, prev_rext, next_text, ellipsis_text, show_page_numbers } = properties;

        runMain();
        setStyles();
        pagination();


        function runMain() {
            instance.canvas.append(getContentPagination());
        }

        function getContentPagination() {
            let $box = $("<div class='pagination'></div>");
            $box.append('<div id="pagination-container"></div>');
            return $box;
        }

        function setStyles() {
            var style = document.createElement('style');
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

		function pagination() {
            $("#pagination-container").html(`<div class="pagination_Gjs custom-pagination_Gjs">
                <div class="pagination_Gjs-pages">
                    <ul></ul>
                </div>
            </div>`);

            const pages = Math.trunc(num_total_items / num_per_page) ? Math.trunc(num_total_items / num_per_page) : 3;
            let li = [];
            if (show_previous_control) {
                li.push(`<li class="pagination_Gjs-prev disabled"><a>${prev_rext}</a></li>`);
            }

            if (show_page_numbers && pages <= 5) {
                for (let i = 0; i < pages; i++) {
                    li.push(`<li class="pagination_Gjs-page J-pagination_Gjs-page ${i ? '' : 'active'}" data-num="${i + 1}"><a>${i + 1}</a></li>`);
                }
            }

            if (show_page_numbers && pages > 5) {
                for (let i = 0; i < pages; i++) {
                    if (i > 2) continue;
                    li.push(`<li class="pagination_Gjs-page J-pagination_Gjs-page ${i ? '' : 'active'}" data-num="${i + 1}"><a>${i + 1}</a></li>`);
                }

                li.push(`<li class="pagination_Gjs-ellipsis disabled"><a>${ellipsis_text}</a></li>`);
                li.push(`<li class="pagination_Gjs-page pagination_Gjs-last J-pagination_Gjs-page " data-num="${pages}"><a>${pages}</a></li>`);
            }

            if (show_next_control) {
                li.push(`<li class="pagination_Gjs-next J-pagination_Gjs-next"><a>${next_text}</a></li>`);
            }

            $("#pagination-container .pagination_Gjs .pagination_Gjs-pages ul").html(li);
        }		
}

