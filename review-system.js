/* Review system - displays fake reviews rotating every 5s, allows user submissions stored in localStorage */
(function () {
    "use strict";

    var fakeReviews = [
        { id: 'f1', name: 'Ẩn danh 001', rating: 5, text: 'Cổng tổng uy tín, rút tiền nhanh, chăm sóc khách hàng tốt!', timestamp: Date.now() - 86400000 },
        { id: 'f2', name: 'Ẩn danh 002', rating: 4, text: 'Giao diện đẹp, dễ sử dụng. Bảo mật cao.', timestamp: Date.now() - 172800000 },
        { id: 'f3', name: 'Ẩn danh 003', rating: 5, text: 'Chơi được nhiều game, thanh toán tiện lợi.', timestamp: Date.now() - 259200000 },
        { id: 'f4', name: 'Ẩn danh 004', rating: 5, text: 'Link vào ổn định, không bị chặn. Rất hài lòng!', timestamp: Date.now() - 345600000 },
        { id: 'f5', name: 'Ẩn danh 005', rating: 3, text: 'Đôi lúc hơi lag nhưng nhìn chung ok.', timestamp: Date.now() - 432000000 },
        { id: 'f6', name: 'Ẩn danh 006', rating: 4, text: 'Nạp rút nhanh, khuyến mãi nhiều.', timestamp: Date.now() - 518400000 },
        { id: 'f7', name: 'Ẩn danh 007', rating: 5, text: 'CSKH 24/7, hỗ trợ nhiệt tình.', timestamp: Date.now() - 604800000 },
        { id: 'f8', name: 'Ẩn danh 008', rating: 5, text: 'Cổng chính thức duy nhất, an toàn pháp lý.', timestamp: Date.now() - 691200000 },
        { id: 'f9', name: 'Ẩn danh 009', rating: 4, text: 'App mượt, dùng trên điện thoại rất êm.', timestamp: Date.now() - 777600000 },
        { id: 'f10', name: 'Ẩn danh 010', rating: 5, text: 'Kết nối mượt, dùng rất yên tâm.', timestamp: Date.now() - 864000000 },
        { id: 'f11', name: 'Ẩn danh 011', rating: 5, text: 'Đã chơi 2 năm, chưa bao giờ bị quỵt tiền.', timestamp: Date.now() - 950400000 },
        { id: 'f12', name: 'Ẩn danh 012', rating: 4, text: 'Hơi khó đăng ký nhưng được hỗ trợ nhanh.', timestamp: Date.now() - 1036800000 },
        { id: 'f13', name: 'Ẩn danh 013', rating: 5, text: 'Nạp tiền cực nhanh, chỉ 30 giây là có.', timestamp: Date.now() - 1123200000 },
        { id: 'f14', name: 'Ẩn danh 014', rating: 5, text: 'Rút tiền không cần phê duyệt, tự động.', timestamp: Date.now() - 1209600000 },
        { id: 'f15', name: 'Ẩn danh 015', rating: 4, text: 'Nhiều game mới, cập nhật liên tục.', timestamp: Date.now() - 1296000000 },
        { id: 'f16', name: 'Ẩn danh 016', rating: 5, text: 'Nhiều game hay, chơi rất cuốn.', timestamp: Date.now() - 1382400000 },
        { id: 'f17', name: 'Ẩn danh 017', rating: 5, text: 'Có app iOS, Android, xài rất mượt.', timestamp: Date.now() - 1468800000 },
        { id: 'f18', name: 'Ẩn danh 018', rating: 4, text: 'Khuyến mãi nạp đầu 200%, quá hời.', timestamp: Date.now() - 1555200000 },
        { id: 'f19', name: 'Ẩn danh 019', rating: 5, text: 'Chăm sóc khách hàng siêu nhanh, 1 phút.', timestamp: Date.now() - 1641600000 },
        { id: 'f20', name: 'Ẩn danh 020', rating: 5, text: 'Link dự phòng nhiều, không sợ chặn.', timestamp: Date.now() - 1728000000 },
        { id: 'f21', name: 'Ẩn danh 021', rating: 5, text: 'Cổng link mượt, nhiều anh em tin dùng.', timestamp: Date.now() - 1814400000 },
        { id: 'f22', name: 'Ẩn danh 022', rating: 4, text: 'Đăng ký đơn giản, không rườm rà.', timestamp: Date.now() - 1900800000 },
        { id: 'f23', name: 'Ẩn danh 023', rating: 5, text: 'Bảo mật 2 lớp, yên tâm khi chơi.', timestamp: Date.now() - 1987200000 },
        { id: 'f24', name: 'Ẩn danh 024', rating: 5, text: 'Mình chơi 6 tháng rồi, chưa bao giờ bị sập.', timestamp: Date.now() - 2073600000 },
        { id: 'f25', name: 'Ẩn danh 025', rating: 5, text: 'Rút tiền thứ 7, chủ nhật vẫn được.', timestamp: Date.now() - 2160000000 },
        { id: 'f26', name: 'Ẩn danh 026', rating: 4, text: 'Nhiều sự kiện, vừa chơi vừa nhận quà.', timestamp: Date.now() - 2246400000 },
        { id: 'f27', name: 'Ẩn danh 027', rating: 5, text: 'Gửi 100tr rút 100tr, không giới hạn.', timestamp: Date.now() - 2332800000 },
        { id: 'f28', name: 'Ẩn danh 028', rating: 5, text: 'Có live casino, gái xinh dealer.', timestamp: Date.now() - 2419200000 },
        { id: 'f29', name: 'Ẩn danh 029', rating: 5, text: 'Thể thao tỉ lệ cược cao, trả thưởng nhanh.', timestamp: Date.now() - 2505600000 },
        { id: 'f30', name: 'Ẩn danh 030', rating: 4, text: 'Nạp tiền qua ngân hàng, ví điện tử đều được.', timestamp: Date.now() - 2592000000 },
        { id: 'f31', name: 'Ẩn danh 031', rating: 5, text: 'Web load nhanh, không bị giật lag.', timestamp: Date.now() - 2678400000 },
        { id: 'f32', name: 'Ẩn danh 032', rating: 5, text: 'Slot đa dạng, hiệu ứng đẹp mắt.', timestamp: Date.now() - 2764800000 },
        { id: 'f33', name: 'Ẩn danh 033', rating: 5, text: 'Hỗ trợ tiếng Việt 24/7, nhân viên thân thiện.', timestamp: Date.now() - 2851200000 },
        { id: 'f34', name: 'Ẩn danh 034', rating: 4, text: 'Có telegram thông báo khuyến mãi hằng ngày.', timestamp: Date.now() - 2937600000 },
        { id: 'f35', name: 'Ẩn danh 035', rating: 5, text: 'Đã rút vài trăm triệu, không vấn đề gì.', timestamp: Date.now() - 3024000000 },
        { id: 'f36', name: 'Ẩn danh 036', rating: 5, text: 'Bạn bè tôi cũng chơi đây, ai cũng khen.', timestamp: Date.now() - 3110400000 }
    ];

    var realReviews = [];
    var STORAGE_KEY = 'LLWIN_all_reviews';
    var gridElement = null;

    function loadReviews() {
        try {
            var stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                var parsed = JSON.parse(stored);
                realReviews = parsed.filter(function (r) { return r.isReal === true; });
            }
        } catch (e) { /* ignore */ }
    }

    function saveReviews() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(realReviews));
        } catch (e) { /* ignore */ }
    }

    function formatTime(timestamp) {
        var date = new Date(timestamp);
        var now = new Date();
        var diff = now - date;

        if (diff < 60000) return 'Vài giây trước';
        if (diff < 3600000) return Math.floor(diff / 60000) + ' phút trước';
        if (diff < 86400000) return Math.floor(diff / 3600000) + ' giờ trước';
        if (diff < 604800000) return Math.floor(diff / 86400000) + ' ngày trước';
        return date.getDate().toString().padStart(2, '0') + '/' +
            (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
            date.getFullYear();
    }

    function createCard(review) {
        var stars = '';
        for (var i = 0; i < 5; i++) {
            var color = i < review.rating ? '#ffdd44' : '#666';
            stars += '<i class="fas fa-star" style="color: ' + color + ';"></i>';
        }

        return '<div class="review-card">' +
            '<div class="reviewer">' +
            '<div class="avatar"><i class="fas fa-user"></i></div>' +
            '<div class="reviewer-info">' +
            '<span class="reviewer-name">' + review.name + '</span>' +
            '<span class="review-date">' + formatTime(review.timestamp) + '</span>' +
            '</div></div>' +
            '<div class="review-stars">' + stars + '</div>' +
            '<div class="review-text">' + review.text + '</div>' +
            '</div>';
    }

    function getLatestReviews() {
        var sortedReal = realReviews.slice().sort(function (a, b) { return b.timestamp - a.timestamp; });
        var shuffledFake = fakeReviews.slice().sort(function () { return Math.random() - 0.5; });
        var selectedFake = shuffledFake.slice(0, 3);

        if (sortedReal.length > 0) {
            return [sortedReal[0]].concat(selectedFake.slice(0, 2));
        }
        return selectedFake.slice(0, 3);
    }

    function renderReviews() {
        if (!gridElement) gridElement = document.getElementById('reviewsGrid');
        if (!gridElement) return;
        var reviews = getLatestReviews();
        gridElement.innerHTML = reviews.map(function (r) { return createCard(r); }).join('');
    }

    function addReview(rating, text) {
        var newReview = {
            id: 'r' + Date.now() + Math.random(),
            name: 'Ẩn danh ' + Math.floor(Math.random() * 900 + 100).toString().padStart(3, '0'),
            rating: rating,
            text: text,
            timestamp: Date.now(),
            isReal: true
        };
        realReviews.unshift(newReview);
        if (realReviews.length > 20) realReviews = realReviews.slice(0, 20);
        saveReviews();
        renderReviews();
    }

    function initForm() {
        var submitBtn = document.getElementById('submitReview');
        var reviewInput = document.getElementById('reviewContent');
        var starInputs = document.querySelectorAll('input[name="rating"]');
        if (!submitBtn || !reviewInput) return;

        submitBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var rating = 0;
            for (var i = 0; i < starInputs.length; i++) {
                if (starInputs[i].checked) {
                    rating = parseInt(starInputs[i].value);
                    break;
                }
            }
            var content = reviewInput.value.trim();
            if (rating === 0) { alert('Vui lòng chọn số sao!'); return; }
            if (content === '') { alert('Vui lòng nhập nội dung đánh giá!'); return; }
            addReview(rating, content);
            reviewInput.value = '';
            for (var j = 0; j < starInputs.length; j++) starInputs[j].checked = false;
            alert('Cảm ơn bạn đã đánh giá!');
        });
    }

    function startRotation() {
        renderReviews();
        setInterval(renderReviews, 5000);
    }

    window.addEventListener('DOMContentLoaded', function () {
        loadReviews();
        gridElement = document.getElementById('reviewsGrid');
        initForm();
        startRotation();
    });
})();
