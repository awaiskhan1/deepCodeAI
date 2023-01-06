import { Typing } from '../typing/Typing';
import styles from './ChatRow.module.css'


export const ChatRow = ({isAI, value}) => {
    const getContent = () => {
        if (value) {
            return isAI ? <Typing text={value} onFinish={() => console.log('done')} /> : value
        }
        return ''
    }
    return (
        <div className={styles.container  + ' ' + `${isAI && styles.ai}`}>
            <div className={styles.chat}>
                <div className={styles.profile}>
                    <img 
                      src={isAI?  './bot.svg': './user.svg'} 
                      alt={isAI? styles.bot : styles.user}
                    />
                </div>
                 <div className={styles.message}>{getContent()}</div>
            </div>
        </div>
    )
}