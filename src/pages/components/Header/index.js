import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header({ title }) {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>{title}</h1>
        </div>
    );
}

export default Header;
