/*
 * WordPress Ajax Load More
 * http://wordpress.org/plugins/ajax-load-more/
 * https://github.com/dcooney/wordpress-ajax-load-more
 *
 * Copyright 2015 Connekt Media - http://connekthq.com
 * Free to use under the GPLv2 license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Author: Darren Cooney
 * Twitter: @KaptonKaos
 */
(function($) {
    "use strict";
    $.ajaxloadmore = function(el, e) {
        if (alm_localize.scrolltop === 'true') {
            $(window).scrollTop(0);
        }
        var alm = this;
        alm.AjaxLoadMore = {};
        alm.page = 0;
        alm.speed = 250;
        alm.proceed = false;
        alm.disable_ajax = false;
        alm.init = true;
        alm.loading = true;
        alm.finished = false;
        alm.window = $(window);
        alm.button_label = '';
        alm.data;
        alm.el = el;
        alm.container = el;
        alm.container.addClass('alm-' + e).attr('data-id', e);
        alm.content = $('.alm-listing.alm-ajax', alm.container);
        alm.content_preloaded = $('.alm-listing.alm-preloaded', alm.container);
        alm.prefix = 'alm-';
        alm.cache = alm.content.attr('data-cache');
        alm.cache_id = alm.content.attr('data-cache-id');
        alm.cache_path = alm.content.attr('data-cache-path');
        alm.cache_logged_in = alm.content.attr('data-cache-logged-in');
        alm.repeater = alm.content.attr('data-repeater');
        alm.theme_repeater = alm.content.attr('data-theme-repeater');
        alm.scroll_distance = parseInt(alm.content.attr('data-scroll-distance'));
        alm.max_pages = parseInt(alm.content.attr('data-max-pages'));
        alm.pause_override = alm.content.attr('data-pause-override');
        alm.pause = alm.content.attr('data-pause');
        alm.transition = alm.content.attr('data-transition');
        alm.images_loaded = alm.content.attr('data-images-loaded');
        alm.destroy_after = alm.content.attr('data-destroy-after');
        alm.lang = alm.content.attr('data-lang');
        alm.orginal_posts_per_page = alm.content.attr('data-posts-per-page');
        alm.posts_per_page = alm.content.attr('data-posts-per-page');
        alm.previous_post = alm.content.attr('data-previous-post');
        alm.previous_post_id = alm.content.attr('data-previous-post-id');
        alm.seo = alm.content.attr('data-seo');
        alm.preloaded = alm.content.attr('data-preloaded');
        alm.preloaded_amount = alm.content.attr('data-preloaded-amount');
        alm.paging = alm.content.attr('data-paging');
        alm.paging_controls = alm.content.attr('data-paging-controls');
        alm.paging_show_at_most = alm.content.attr('data-paging-show-at-most');
        alm.paging_classes = alm.content.attr('data-paging-classes');
        if (alm.paging === 'true') {
            alm.paging = true;
            if (alm.paging_show_at_most === undefined) {
                alm.paging_show_at_most = 7;
            }
        } else {
            alm.paging = false;
        }
        if (alm.paging_controls === 'true') {
            alm.paging_controls = true;
        } else {
            alm.paging_controls = false;
        }
        if ($(".ajax-load-more-wrap").length > 1) {}
        if (alm.cache === undefined) {
            alm.cache = false;
        }
        if (alm.cache_logged_in === undefined) {
            alm.cache_logged_in = false;
        }
        if (alm.preloaded === 'true') {
            alm.preload_wrap = alm.content.prev('.alm-preloaded');
            alm.total_posts = parseInt(alm.preload_wrap.attr('data-total-posts'));
            if (alm.preloaded_amount === undefined) {
                alm.preloaded_amount = false;
            }
            if (alm.total_posts <= alm.preloaded_amount) {
                alm.disable_ajax = true;
            }
        } else {
            alm.preloaded = 'false';
        }
        if (alm.seo === undefined) {
            alm.seo = false;
        }
        if (alm.seo === 'true') {
            alm.seo = true;
        }
        alm.permalink = alm.content.attr('data-seo-permalink');
        alm.pageview = alm.content.attr('data-seo-pageview');
        alm.start_page = alm.content.attr('data-seo-start-page');
        if (alm.start_page) {
            alm.seo_scroll = alm.content.attr('data-seo-scroll');
            alm.seo_scroll_speed = alm.content.attr('data-seo-scroll-speed');
            alm.seo_scrolltop = alm.content.attr('data-seo-scrolltop');
            alm.isPaged = false;
            if (alm.start_page > 1) {
                alm.isPaged = true;
                alm.posts_per_page = alm.start_page * alm.posts_per_page;
            }
            if (alm.paging) {
                alm.posts_per_page = alm.orginal_posts_per_page;
            }
        } else {
            alm.start_page = 1;
        }
        if (alm.previous_post === 'true') {
            alm.previous_post = true;
            alm.previous_post_permalink = '';
            alm.previous_post_title = '';
        } else {
            alm.previous_post = false;
        }
        if (alm.previous_post_id === undefined) {
            alm.previous_post_id = '';
        }
        alm.previous_post_title_template = alm.content.attr('data-previous-post-title-template');
        alm.siteTitle = alm.content.attr('data-previous-post-site-title');
        alm.siteTagline = alm.content.attr('data-previous-post-site-tagline');
        alm.previous_post_pageview = alm.content.attr('data-previous-post-pageview');
        alm.previous_post_scroll = alm.content.attr('data-previous-post-scroll');
        alm.previous_post_scroll_speed = alm.content.attr('data-previous-post-scroll-speed');
        alm.previous_post_scroll_top = alm.content.attr('data-previous-post-scrolltop');
        if (alm.content.attr('data-offset') === undefined) {
            alm.offset = 0;
        } else {
            alm.offset = alm.content.attr('data-offset');
        }
        if (alm.pause === undefined || (alm.seo && alm.start_page > 1)) {
            alm.pause = false;
        }
        if (alm.preloaded === 'true' && alm.seo && alm.start_page > 0) {
            alm.pause = false;
        }
        if (alm.repeater === undefined) {
            alm.repeater = 'default';
        }
        if (alm.theme_repeater === undefined) {
            alm.theme_repeater = 'null';
        }
        if (alm.max_pages === undefined) {
            alm.max_pages = 5;
        }
        if (alm.max_pages === 0) {
            alm.max_pages = 10000;
        }
        if (alm.scroll_distance === undefined) {
            alm.scroll_distance = 150;
        }
        if (alm.transition === undefined) {
            alm.transition = 'slide';
        } else if (alm.transition === "fade") {
            alm.transition = 'fade';
        } else if (alm.transition === "none") {
            alm.transition = 'none';
        } else {
            alm.transition = 'slide';
        }
        if (alm.images_loaded === undefined) {
            alm.images_loaded = 'false';
        }
        if (alm.destroy_after !== undefined) {}
        if (alm.content.attr('data-button-label') === undefined) {
            alm.button_label = 'Older Posts';
        } else {
            alm.button_label = alm.content.attr('data-button-label');
        }
        if (alm.content.attr('data-button-class') === undefined) {
            alm.button_class = '';
        } else {
            alm.button_class = ' ' + alm.content.attr('data-button-class');
        }
        if (alm.content.attr('data-scroll') === undefined) {
            alm.scroll = true;
        } else if (alm.content.attr('data-scroll') === 'false') {
            alm.scroll = false;
        } else {
            alm.scroll = true;
        }
        alm.post_type = alm.content.attr('data-post-type');
        alm.post_type = alm.post_type.split(",");
        alm.container.append('<div class="' + alm.prefix + 'btn-wrap"/>');
        alm.btnWrap = $('.' + alm.prefix + 'btn-wrap', alm.container);
        if (alm.paging) {
            alm.content.parent().addClass('loading');
        } else {
            //$('.' + alm.prefix + 'btn-wrap', alm.container).append('<button id="load-more" class="' + alm.prefix + 'load-more-btn more' + alm.button_class + '">' + alm.button_label + '</button>');
			$('.' + alm.prefix + 'btn-wrap', alm.container).append('<a id="load-more" class="' + alm.prefix + 'load-more-btn more' + alm.button_class + ' more-posts desktop" href="javascript:void(0)">&nbsp;</a><a class="' + alm.prefix + 'load-more-btn more' + alm.button_class + ' small-button gray-button more-content mobile" href="javascript:void(0)">mais posts</a>');

            alm.button = $('.alm-load-more-btn', alm.container);
        }
        alm.AjaxLoadMore.loadPosts = function() {
            if (!alm.disable_ajax) {
                if (!alm.paging) {
                    alm.button.addClass('loading');
                }
                alm.loading = true;
                if (alm.cache === 'true' && !alm.cache_logged_in) {
                    if (alm.init && alm.seo && alm.isPaged) {
                        alm.AjaxLoadMore.ajax('standard');
                    } else {
                        var cachePage = alm.cache_path + '/page-' + alm.page + '.html';
                        $.get(cachePage, function(data) {
                            alm.AjaxLoadMore.success(data);
                        }).fail(function() {
                            alm.AjaxLoadMore.ajax('standard');
                        });
                    }
                } else {
                    alm.AjaxLoadMore.ajax('standard');
                }
            }
        };
        alm.AjaxLoadMore.ajax = function(queryType) {
            if (alm.previous_post) {
                alm.previous_post_id = alm.content.attr('data-previous-post-id');
            }
            $.ajax({
                type: "GET",
                url: alm_localize.ajaxurl,
                data: {
                    action: 'alm_query_posts',
                    query_type: queryType,
                    nonce: alm_localize.alm_nonce,
                    cache_id: alm.cache_id,
                    repeater: alm.repeater,
                    theme_repeater: alm.theme_repeater,
                    post_type: alm.post_type,
                    post_format: alm.content.attr('data-post-format'),
                    category: alm.content.attr('data-category'),
                    category__not_in: alm.content.attr('data-category-not-in'),
                    tag: alm.content.attr('data-tag'),
                    tag__not_in: alm.content.attr('data-tag-not-in'),
                    taxonomy: alm.content.attr('data-taxonomy'),
                    taxonomy_terms: alm.content.attr('data-taxonomy-terms'),
                    taxonomy_operator: alm.content.attr('data-taxonomy-operator'),
                    meta_key: alm.content.attr('data-meta-key'),
                    meta_value: alm.content.attr('data-meta-value'),
                    meta_compare: alm.content.attr('data-meta-compare'),
                    meta_relation: alm.content.attr('data-meta-relation'),
                    meta_type: alm.content.attr('data-meta-type'),
                    author: alm.content.attr('data-author'),
                    year: alm.content.attr('data-year'),
                    month: alm.content.attr('data-month'),
                    day: alm.content.attr('data-day'),
                    post_status: alm.content.attr('data-post-status'),
                    order: alm.content.attr('data-order'),
                    orderby: alm.content.attr('data-orderby'),
                    post__in: alm.content.attr('data-post-in'),
                    exclude: alm.content.attr('data-exclude'),
                    search: alm.content.attr('data-search'),
                    custom_args: alm.content.attr('data-custom-args'),
                    all_blogs: alm.content.attr('data-all-blogs'),
                    posts_per_page: alm.posts_per_page,
                    pageNumber: alm.page,
                    offset: alm.offset,
                    preloaded: alm.preloaded,
                    preloaded_amount: alm.preloaded_amount,
                    seo_start_page: alm.start_page,
                    previous_post: alm.previous_post,
                    previous_post_id: alm.previous_post_id,
                    lang: alm.lang
                },
                dataType: "html",
                beforeSend: function() {
                    if (alm.page != 1 && !alm.paging) {
                        alm.button.addClass('loading');
                    }
                },
                success: function(data) {
                    if (queryType === 'standard') {
                        alm.AjaxLoadMore.success(data);
                    } else if (queryType === 'totalposts' && alm.paging) {
                        if ($.isFunction($.fn.almBuildPagination)) {
                            $.fn.almBuildPagination(data, alm);
                        }
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alm.AjaxLoadMore.error(jqXHR, textStatus, errorThrown);
                }
            });
        };
        if (alm.paging) {
            alm.AjaxLoadMore.ajax('totalposts');
        }
        alm.AjaxLoadMore.success = function(data) {
            var previousPostID = '';
            if (alm.previous_post) {
                alm.AjaxLoadMore.getPreviousPost();
            }
            alm.data = $(data);
            if (alm.init) {
                if (!alm.paging) {
                    alm.button.text(alm.button_label);
                } else {
                    if (alm.data.length > 0) {
                        alm.el = $('<div class="alm-reveal"/>');
                        alm.el.append('<div class="alm-paging-content"></div><div class="alm-paging-loading"></div>');
                        $('.alm-paging-content', alm.el).append(alm.data).hide();
                        alm.content.append(alm.el);
                        alm.content.parent().removeClass('loading');
                        $('.alm-paging-content', alm.el).fadeIn(alm.speed, 'alm_easeInOutQuad', function() {
                            var paddingT = parseInt(alm.content.css('padding-top')),
                                paddingB = parseInt(alm.content.css('padding-bottom'));
                            alm.content.css('height', alm.el.height() + paddingT + paddingB + 'px');
                            if ($.isFunction($.fn.almFadePageControls)) {
                                $.fn.almFadePageControls(alm.btnWrap);
                            }
                        });
                    }
                }
                if (!alm.data.length > 0) {
                    if ($.isFunction($.fn.almEmpty)) {
                        $.fn.almEmpty(alm);
                    }
                }
                if (alm.isPaged) {
                    alm.posts_per_page = alm.content.attr('data-posts-per-page');
                    alm.page = alm.start_page - 1;
                }
            }
            if (alm.data.length > 0) {
                if (!alm.paging) {
                    if (alm.previous_post) {
                        alm.el = $('<div class="alm-reveal alm-previous-post post-' + alm.previous_post_id + '" data-id="' + alm.previous_post_id + '" data-title="' + alm.previous_post_title + '" data-url="' + alm.previous_post_permalink + '"/>');
                    } else {
                        alm.el = $('<div class="alm-reveal"/>');
                    }
                    alm.el.append(alm.data).hide();
                    alm.content.append(alm.el);
                    if (alm.transition === 'fade') {
                        if (alm.images_loaded === 'true') {
                            alm.el.almWaitForImages().done(function() {
                                alm.el.fadeIn(alm.speed, 'alm_easeInOutQuad', function() {
                                    alm.loading = false;
                                    if (!alm.paging) {
                                        alm.button.delay(alm.speed).removeClass('loading');
                                    }
                                    if (alm.data.length < alm.posts_per_page) {
                                        alm.finished = true;
                                        if (!alm.paging) {
                                            alm.button.addClass('done');
                                        }
                                    }
                                });
                            });
                        } else {
                            alm.el.fadeIn(alm.speed, 'alm_easeInOutQuad', function() {
                                alm.loading = false;
                                if (!alm.paging) {
                                    alm.button.delay(alm.speed).removeClass('loading');
                                }
                                if (alm.data.length < alm.posts_per_page) {
                                    alm.finished = true;
                                    if (!alm.paging) {
                                        alm.button.addClass('done');
                                    }
                                }
                            });
                        }
                    } else if (alm.transition === 'none') {
                        if (alm.images_loaded === 'true') {
                            alm.el.almWaitForImages().done(function() {
                                alm.el.show();
                            });
                        } else {
                            alm.el.show();
                        }
                        alm.loading = false;
                        if (!alm.paging) {
                            alm.button.delay(alm.speed).removeClass('loading');
                        }
                        if (alm.data.length < alm.posts_per_page) {
                            alm.finished = true;
                            if (!alm.paging) {
                                alm.button.addClass('done');
                            }
                        }
                    } else {
                        if (alm.images_loaded === 'true') {
                            alm.el.almWaitForImages().done(function() {
                                alm.el.slideDown(alm.speed, 'alm_easeInOutQuad', function() {
                                    alm.loading = false;
                                    if (!alm.paging) {
                                        alm.button.delay(alm.speed).removeClass('loading');
                                    }
                                    if (alm.data.length < alm.posts_per_page) {
                                        alm.finished = true;
                                        if (!alm.paging) {
                                            alm.button.addClass('done');
                                        }
                                    }
                                });
                            });
                        } else {
                            alm.el.slideDown(alm.speed, 'alm_easeInOutQuad', function() {
                                alm.loading = false;
                                if (!alm.paging) {
                                    alm.button.delay(alm.speed).removeClass('loading');
                                }
                                if (alm.data.length < alm.posts_per_page) {
                                    alm.finished = true;
                                    if (!alm.paging) {
                                        alm.button.addClass('done');
                                    }
                                }
                            });
                        }
                    }
                } else {
                    if (!alm.init) {
                        $('.alm-paging-content', alm.el).html('').append(alm.data).almWaitForImages().done(function() {
                            $('.alm-paging-loading', alm.el).fadeOut(alm.speed);
                            if ($.isFunction($.fn.almOnPagingComplete)) {
                                $.fn.almOnPagingComplete(alm);
                            }
                        });
                    }
                }
                if ($.isFunction($.fn.almComplete)) {
                    if (alm.images_loaded === 'true') {
                        alm.el.almWaitForImages().done(function() {
                            $.fn.almComplete(alm);
                        });
                    } else {
                        $.fn.almComplete(alm);
                    }
                }
                if ($(".ajax-load-more-wrap").length === 1) {
                    if ($.isFunction($.fn.almSEO) && alm.seo) {
                        if (alm.images_loaded === 'true') {
                            alm.el.almWaitForImages().done(function() {
                                $.fn.almSEO(alm);
                            });
                        } else {
                            $.fn.almSEO(alm);
                        }
                    }
                }
            } else {
                if (!alm.paging) {
                    alm.button.delay(alm.speed).removeClass('loading').addClass('done');
                }
                alm.loading = false;
                alm.finished = true;
            }
            if (alm.destroy_after !== undefined && alm.destroy_after !== '') {
                var currentPage = alm.page + 1;
                if (alm.preload) {
                    currentPage++;
                }
                if (currentPage == alm.destroy_after) {
                    alm.disable_ajax = true;
                    if (!alm.paging) {
                        alm.button.delay(alm.speed).fadeOut(alm.speed);
                    }
                }
            }
            alm.init = false;
        };
        alm.fetchingPreviousPost = false;
        alm.AjaxLoadMore.getPreviousPost = function() {
            alm.fetchingPreviousPost = true;
            $.ajax({
                type: "GET",
                dataType: "JSON",
                url: alm_localize.ajaxurl,
                data: {
                    action: 'alm_query_previous_post',
                    id: alm.previous_post_id,
                },
                success: function(data) {
                    if (data.has_previous_post) {
                        alm.content.attr('data-previous-post-id', data.prev_id);
                        alm.previous_post_permalink = data.prev_permalink;
                        alm.previous_post_title = data.prev_title;
                    } else {
                        if (!data.has_previous_post) {
                            alm.finished = true;
                            alm.button.addClass('done');
                        }
                    }
                    if ($.isFunction($.fn.almSetPreviousPost)) {
                        $.fn.almSetPreviousPost(alm, data.current_id, data.permalink, data.title);
                    }
                    alm.fetchingPreviousPost = false;
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alm.AjaxLoadMore.error(jqXHR, textStatus, errorThrown);
                    alm.fetchingPreviousPost = false;
                }
            });
        }
        alm.AjaxLoadMore.error = function(jqXHR, textStatus, errorThrown) {
            alm.loading = false;
            if (!alm.paging) {
                alm.button.removeClass('loading');
            }
            console.log(errorThrown);
        };
        if (!alm.paging && !alm.fetchingPreviousPost) {
            alm.button.on('click', function() {
                if (alm.pause === 'true') {
                    alm.pause = false;
                    alm.pause_override = false;
                    alm.AjaxLoadMore.loadPosts();
                }
                if (!alm.loading && !alm.finished && !$(this).hasClass('done')) {
                    alm.loading = true;
                    alm.page++;
                    alm.AjaxLoadMore.loadPosts();
                }
            });
        }
        if (alm.paging) {
            alm.window.resize(function() {
                if ($.isFunction($.fn.almOnWindowResize)) {
                    setTimeout(function() {
                        $.fn.almOnWindowResize(alm);
                    }, 250);
                }
            });
        }
        alm.AjaxLoadMore.isVisible = function() {
            alm.visible = false;
            if (alm.el.is(":visible")) {
                alm.visible = true;
            }
            return alm.visible;
        };
        if (alm.scroll && !alm.paging) {
            alm.window.bind("scroll touchstart", function() {
                if (alm.AjaxLoadMore.isVisible() && !alm.fetchingPreviousPost) {
                    var content_offset = alm.button.offset(),
                        top = Math.round(content_offset.top - (alm.window.height() - alm.scroll_distance));
                    if (!alm.loading && !alm.finished && (alm.window.scrollTop() >= top) && alm.page < (alm.max_pages - 1) && alm.proceed && alm.pause === 'true' && alm.pause_override === 'true') {
                        alm.button.trigger('click');
                    } else {
                        if (!alm.loading && !alm.finished && (alm.window.scrollTop() >= top) && alm.page < (alm.max_pages - 1) && alm.proceed && alm.pause !== 'true') {
                            alm.page++;
                            alm.AjaxLoadMore.loadPosts();
                        }
                    }
                }
            });
        }
        if (!alm.paging && !alm.previous_post) {
            if (alm.disable_ajax) {
                alm.finished = true;
                alm.button.addClass('done');
            } else {
                if (alm.pause === 'true') {
                    alm.button.text(alm.button_label);
                    alm.loading = false;
                } else {
                    alm.AjaxLoadMore.loadPosts();
                }
            }
        }
        if (alm.previous_post) {
            alm.AjaxLoadMore.getPreviousPost();
            alm.loading = false;
        }
        setTimeout(function() {
            alm.proceed = true;
        }, 500);
        $.fn.almUpdateCurrentPage = function(current) {
            alm.page = current;
            alm.AjaxLoadMore.loadPosts();
        };
        $.fn.almGetParentContainer = function() {
            return alm.el.closest('#ajax-load-more');
        };
        $.fn.almGetObj = function() {
            return alm;
        };
        $.easing.alm_easeInOutQuad = function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        };
    };
    $.fn.almFilter = function(transition, speed, data) {
        $(".ajax-load-more-wrap").each(function(e) {
            var el = $(this);
            if (transition === 'slide') {
                el.slideUp(speed, function() {
                    $('.alm-listing', el).html('');
                    $('.alm-btn-wrap', el).remove();
                    el.fadeIn(speed);
                    $.fn.almSetFilters(el, data);
                });
            } else if (transition === 'fade') {
                el.fadeOut(speed, function() {
                    $('.alm-listing', el).html('');
                    $('.alm-btn-wrap', el).remove();
                    el.fadeIn(speed);
                    $.fn.almSetFilters(el, data);
                });
            } else {
                $('.alm-listing', el).html('');
                $('.alm-btn-wrap', el).remove();
                el.fadeIn(speed);
                $.fn.almSetFilters(el, data);
            }
        });
    };
    $.fn.almSetFilters = function(el, data) {
        $.each(data, function(key, value) {
            key = key.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2');
            $('.alm-listing', el).attr('data-' + key, value);
        });
        if ($.isFunction($.fn.almFilterComplete)) {
            $.fn.almFilterComplete();
        }
        $(".ajax-load-more-wrap").ajaxloadmore();
    };
    $.fn.ajaxloadmore = function() {
        return this.each(function(e) {
            $(this).data('alm', new $.ajaxloadmore($(this), e));
        });
    };
    if ($(".ajax-load-more-wrap").length) {
        $(".ajax-load-more-wrap").ajaxloadmore();
    }
})(jQuery);;
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    var eventNamespace = 'almWaitForImages';
    $.almWaitForImages = {
        hasImageProperties: ['backgroundImage', 'listStyleImage', 'borderImage', 'borderCornerImage', 'cursor'],
        hasImageAttributes: ['srcset']
    };
    $.expr[':']['has-src'] = function(obj) {
        return $(obj).is('img[src][src!=""]');
    };
    $.expr[':'].uncached = function(obj) {
        if (!$(obj).is(':has-src')) {
            return false;
        }
        return !obj.complete;
    };
    $.fn.almWaitForImages = function() {
        var allImgsLength = 0;
        var allImgsLoaded = 0;
        var deferred = $.Deferred();
        var finishedCallback;
        var eachCallback;
        var waitForAll;
        if ($.isPlainObject(arguments[0])) {
            waitForAll = arguments[0].waitForAll;
            eachCallback = arguments[0].each;
            finishedCallback = arguments[0].finished;
        } else {
            if (arguments.length === 1 && $.type(arguments[0]) === 'boolean') {
                waitForAll = arguments[0];
            } else {
                finishedCallback = arguments[0];
                eachCallback = arguments[1];
                waitForAll = arguments[2];
            }
        }
        finishedCallback = finishedCallback || $.noop;
        eachCallback = eachCallback || $.noop;
        waitForAll = !!waitForAll;
        if (!$.isFunction(finishedCallback) || !$.isFunction(eachCallback)) {
            throw new TypeError('An invalid callback was supplied.');
        }
        this.each(function() {
            var obj = $(this);
            var allImgs = [];
            var hasImgProperties = $.almWaitForImages.hasImageProperties || [];
            var hasImageAttributes = $.almWaitForImages.hasImageAttributes || [];
            var matchUrl = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
            if (waitForAll) {
                obj.find('*').addBack().each(function() {
                    var element = $(this);
                    if (element.is('img:has-src')) {
                        allImgs.push({
                            src: element.attr('src'),
                            element: element[0]
                        });
                    }
                    $.each(hasImgProperties, function(i, property) {
                        var propertyValue = element.css(property);
                        var match;
                        if (!propertyValue) {
                            return true;
                        }
                        while (match = matchUrl.exec(propertyValue)) {
                            allImgs.push({
                                src: match[2],
                                element: element[0]
                            });
                        }
                    });
                    $.each(hasImageAttributes, function(i, attribute) {
                        var attributeValue = element.attr(attribute);
                        var attributeValues;
                        if (!attributeValue) {
                            return true;
                        }
                        attributeValues = attributeValue.split(',');
                        $.each(attributeValues, function(i, value) {
                            value = $.trim(value).split(' ')[0];
                            allImgs.push({
                                src: value,
                                element: element[0]
                            });
                        });
                    });
                });
            } else {
                obj.find('img:has-src').each(function() {
                    allImgs.push({
                        src: this.src,
                        element: this
                    });
                });
            }
            allImgsLength = allImgs.length;
            allImgsLoaded = 0;
            if (allImgsLength === 0) {
                finishedCallback.call(obj[0]);
                deferred.resolveWith(obj[0]);
            }
            $.each(allImgs, function(i, img) {
                var image = new Image();
                var events = 'load.' + eventNamespace + ' error.' + eventNamespace;
                $(image).one(events, function me(event) {
                    var eachArguments = [allImgsLoaded, allImgsLength, event.type == 'load'];
                    allImgsLoaded++;
                    eachCallback.apply(img.element, eachArguments);
                    deferred.notifyWith(img.element, eachArguments);
                    $(this).off(events, me);
                    if (allImgsLoaded == allImgsLength) {
                        finishedCallback.call(obj[0]);
                        deferred.resolveWith(obj[0]);
                        return false;
                    }
                });
                image.src = img.src;
            });
        });
        return deferred.promise();
    };
}));